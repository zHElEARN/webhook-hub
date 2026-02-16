import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
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
		.leftJoin(webhookConfigs, eq(webhookLogs.configId, webhookConfigs.id))
		.orderBy(desc(webhookLogs.createdAt));

	return { logs };
};

export const actions: Actions = {
	delete: async ({ cookies, request }) => {
		if (!isAuthenticated(cookies)) {
			redirect(302, '/login');
		}

		const formData = await request.formData();
		const id = formData.get('id');

		if (typeof id !== 'string' || id.length === 0) {
			redirect(303, '/dashboard/logs');
		}

		await db.delete(webhookLogs).where(eq(webhookLogs.id, id));
		redirect(303, '/dashboard/logs');
	}
};
