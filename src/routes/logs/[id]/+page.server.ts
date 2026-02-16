import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { webhookLogs } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const rows = await db
		.select({
			id: webhookLogs.id,
			requestPayload: webhookLogs.requestPayload,
			parsedMessage: webhookLogs.parsedMessage,
			createdAt: webhookLogs.createdAt
		})
		.from(webhookLogs)
		.where(eq(webhookLogs.id, params.id))
		.limit(1);

	const log = rows[0];

	if (!log) {
		throw error(404, '日志不存在');
	}

	return { log };
};
