import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { webhookConfigs } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { Script } from 'node:vm';

async function runParserScript(parserScript: string, payload: unknown): Promise<string> {
	const wrappedScript = `(async () => {\n${parserScript}\n})()`;
	const vmScript = new Script(wrappedScript);

	const execution = vmScript.runInNewContext({ payload }, { timeout: 1000 }) as Promise<unknown>;

	const result = await Promise.race([
		execution,
		new Promise<never>((_, reject) => {
			setTimeout(() => reject(new Error('Parser script execution timeout (1s)')), 1000);
		})
	]);

	if (typeof result !== 'string') {
		throw new Error('Parser script must return a string');
	}

	return result;
}

async function handle(configId: string, payload: unknown) {
	const config = await db
		.select()
		.from(webhookConfigs)
		.where(eq(webhookConfigs.id, configId))
		.limit(1);

	const row = config[0];

	if (!row) {
		return json({ success: false });
	}

	console.log('Matched webhook config:', row);

	const parsedMessage = await runParserScript(row.parserScript, payload);
	if (!parsedMessage) {
		throw new Error('Parser script did not return a message');
	}

	console.log('Parsed message:', parsedMessage);

	return json({ success: true });
};

export const POST: RequestHandler = async ({ params, request }) => {
	let payload: unknown;

	try {
		payload = await request.json();
	} catch {
		throw new Error('Invalid JSON payload');
	}

	return handle(params.configId, payload);
};
