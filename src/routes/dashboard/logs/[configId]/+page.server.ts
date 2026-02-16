import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { isAuthenticated } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { webhookConfigs, webhookLogs } from '$lib/server/db/schema';
import { and, desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ cookies, params }) => {
	if (!isAuthenticated(cookies)) {
		redirect(302, '/login');
	}

	const configRows = await db
		.select({
			id: webhookConfigs.id,
			name: webhookConfigs.name
		})
		.from(webhookConfigs)
		.where(eq(webhookConfigs.id, params.configId))
		.limit(1);

	const config = configRows[0];

	if (!config) {
		throw error(404, '配置不存在');
	}

	const logs = await db
		.select({
			id: webhookLogs.id,
			configId: webhookLogs.configId,
			createdAt: webhookLogs.createdAt
		})
		.from(webhookLogs)
		.where(eq(webhookLogs.configId, params.configId))
		.orderBy(desc(webhookLogs.createdAt));

	return {
		configId: params.configId,
		configName: config.name,
		logs
	};
};

export const actions: Actions = {
	delete: async ({ cookies, request, params }) => {
		if (!isAuthenticated(cookies)) {
			redirect(302, '/login');
		}

		const formData = await request.formData();
		const id = formData.get('id');

		if (typeof id !== 'string' || id.length === 0) {
			redirect(303, `/dashboard/logs/${params.configId}`);
		}

		await db
			.delete(webhookLogs)
			.where(and(eq(webhookLogs.id, id), eq(webhookLogs.configId, params.configId)));

		redirect(303, `/dashboard/logs/${params.configId}`);
	}
};
