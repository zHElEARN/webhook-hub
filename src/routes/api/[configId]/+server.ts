import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { webhookConfigs, webhookLogs } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { Script } from 'node:vm';

const pureFetch = (url: string | URL | Request, init?: RequestInit) => {
	return globalThis.fetch(url, init);
};

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

async function runPusherScript(pusherScript: string, message: string): Promise<void> {
	const wrappedScript = `(async () => {\n${pusherScript}\n})()`;
	const vmScript = new Script(wrappedScript);

	const execution = vmScript.runInNewContext(
		{ message, fetch: pureFetch },
		{ timeout: 10000 }
	) as Promise<unknown>;

	await Promise.race([
		execution,
		new Promise<never>((_, reject) => {
			setTimeout(() => reject(new Error('Pusher script execution timeout (10s)')), 10000);
		})
	]);
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

	const logId = crypto.randomUUID();

	await db.insert(webhookLogs).values({
		id: logId,
		configId: row.id,
		requestPayload: JSON.stringify(payload),
		parsedMessage
	});

	console.log('Created webhook log id:', logId);

	console.log('Parsed message:', parsedMessage);

	await runPusherScript(row.pusherScript, parsedMessage);

	return json({ success: true });
}

export const POST: RequestHandler = async ({ params, request }) => {
	let payload: unknown;

	try {
		payload = await request.json();
	} catch {
		throw new Error('Invalid JSON payload');
	}

	return handle(params.configId, payload);
};
