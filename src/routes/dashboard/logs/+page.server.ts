import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isAuthenticated } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { webhookConfigs, webhookLogs } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ cookies }) => {
	if (!isAuthenticated(cookies)) {
		redirect(302, '/login');
	}

	const logs = await db
		.select({
			id: webhookLogs.id,
			configId: webhookLogs.configId,
			configName: webhookConfigs.name,
			createdAt: webhookLogs.createdAt
		})
		.from(webhookLogs)
		.innerJoin(webhookConfigs, eq(webhookLogs.configId, webhookConfigs.id))
		.orderBy(desc(webhookLogs.createdAt));

	return { logs };
};
