import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { isAuthenticated, setAuthCookie } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies }) => {
	if (isAuthenticated(cookies)) {
		redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = formData.get('password');

		if (typeof password !== 'string' || password.length === 0) {
			return fail(400, { error: '请输入密码' });
		}

		if (!env.ADMIN_PASSWORD) {
			throw new Error('ADMIN_PASSWORD is not set');
		}

		if (password !== env.ADMIN_PASSWORD) {
			return fail(401, { error: '密码错误' });
		}

		setAuthCookie(cookies);
		redirect(302, '/dashboard');
	}
};
