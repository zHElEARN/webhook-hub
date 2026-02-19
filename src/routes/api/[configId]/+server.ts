import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { webhookConfigs, webhookLogs } from '$lib/server/db/schema';
import { createRouteLogger, getErrorMessage } from '$lib/server/logger';
import { eq } from 'drizzle-orm';
import { Script } from 'node:vm';
import { nanoid } from 'nanoid';
import nodemailer from 'nodemailer';

const logger = createRouteLogger('/api/[configId]');

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

async function runPusherScript(
	pusherScript: string,
	message: string,
	id: string,
	url: string
): Promise<void> {
	const wrappedScript = `(async () => {\n${pusherScript}\n})()`;
	const vmScript = new Script(wrappedScript);

	const execution = vmScript.runInNewContext(
		{ message, id, url, fetch, nodemailer },
		{ timeout: 10000 }
	) as Promise<unknown>;

	await Promise.race([
		execution,
		new Promise<never>((_, reject) => {
			setTimeout(() => reject(new Error('Pusher script execution timeout (10s)')), 10000);
		})
	]);
}

async function handle(configId: string, payload: unknown, siteUrl: string) {
	const config = await db
		.select()
		.from(webhookConfigs)
		.where(eq(webhookConfigs.id, configId))
		.limit(1);

	const row = config[0];

	if (!row) {
		logger.info('config_not_found', { configId });
		return json({ success: false, error: 'Webhook config not found' }, { status: 404 });
	}

	logger.info('config_matched', { configId: row.id });

	const parsedMessage = await runParserScript(row.parserScript, payload);
	if (!parsedMessage) {
		throw new Error('Parser script did not return a message');
	}

	const logId = nanoid();

	await db.insert(webhookLogs).values({
		id: logId,
		configId: row.id,
		requestPayload: JSON.stringify(payload),
		parsedMessage
	});

	logger.info('webhook_log_created', { logId, configId: row.id });
	logger.info('payload_parsed', { logId, configId: row.id, parsedMessage });

	await runPusherScript(row.pusherScript, parsedMessage, logId, siteUrl);

	return json({ success: true });
}

export const POST: RequestHandler = async ({ params, request }) => {
	let payload: unknown;
	const siteUrl = new URL(request.url).origin;

	try {
		payload = await request.json();
	} catch (error) {
		logger.error('invalid_json_payload', {
			configId: params.configId,
			error: getErrorMessage(error)
		});
		return json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
	}

	try {
		return await handle(params.configId, payload, siteUrl);
	} catch (error) {
		logger.error('webhook_handle_failed', {
			configId: params.configId,
			error: getErrorMessage(error)
		});
		return json({ success: false, error: 'Failed to process webhook request' }, { status: 500 });
	}
};
