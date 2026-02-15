import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { clearAuthCookie, isAuthenticated } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { webhookConfigs } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ cookies }) => {
	if (!isAuthenticated(cookies)) {
		redirect(302, '/login');
	}

	const configs = await db.select().from(webhookConfigs);

	return { configs };
};

export const actions: Actions = {
	delete: async ({ cookies, request }) => {
		if (!isAuthenticated(cookies)) {
			redirect(302, '/login');
		}

		const formData = await request.formData();
		const id = formData.get('id');

		if (typeof id !== 'string' || id.length === 0) {
			redirect(303, '/dashboard');
		}

		await db.delete(webhookConfigs).where(eq(webhookConfigs.id, id));
		redirect(303, '/dashboard');
	},

	logout: async ({ cookies }) => {
		clearAuthCookie(cookies);
		redirect(302, '/');
	}
};
