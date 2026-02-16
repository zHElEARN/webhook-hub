import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { isAuthenticated } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { webhookConfigs } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ cookies, params }) => {
	if (!isAuthenticated(cookies)) {
		redirect(302, '/login');
	}

	const rows = await db
		.select({
			id: webhookConfigs.id,
			name: webhookConfigs.name,
			parserScript: webhookConfigs.parserScript,
			pusherScript: webhookConfigs.pusherScript
		})
		.from(webhookConfigs)
		.where(eq(webhookConfigs.id, params.id))
		.limit(1);

	const config = rows[0];

	if (!config) {
		throw error(404, '配置不存在');
	}

	return { config };
};

export const actions: Actions = {
	default: async ({ request, cookies, params }) => {
		if (!isAuthenticated(cookies)) {
			redirect(302, '/login');
		}

		const formData = await request.formData();
		const name = formData.get('name');
		const parserScript = formData.get('parserScript');
		const pusherScript = formData.get('pusherScript');

		if (
			typeof name !== 'string' ||
			typeof parserScript !== 'string' ||
			typeof pusherScript !== 'string' ||
			name.trim().length === 0 ||
			parserScript.trim().length === 0 ||
			pusherScript.trim().length === 0
		) {
			return fail(400, { error: '请完整填写所有字段' });
		}

		const result = await db
			.update(webhookConfigs)
			.set({
				name: name.trim(),
				parserScript: parserScript.trim(),
				pusherScript: pusherScript.trim()
			})
			.where(eq(webhookConfigs.id, params.id));

		if (result.changes === 0) {
			throw error(404, '配置不存在');
		}

		redirect(302, '/dashboard');
	}
};
