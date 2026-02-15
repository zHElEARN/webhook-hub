import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { isAuthenticated } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { webhookConfigs } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ cookies }) => {
	if (!isAuthenticated(cookies)) {
		redirect(302, '/login');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
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

		await db.insert(webhookConfigs).values({
			name: name.trim(),
			parserScript: parserScript.trim(),
			pusherScript: pusherScript.trim()
		});

		redirect(302, '/dashboard');
	}
};
