import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { clearAuthCookie, isAuthenticated } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies }) => {
	if (!isAuthenticated(cookies)) {
		redirect(302, '/login');
	}
};

export const actions: Actions = {
	logout: async ({ cookies }) => {
		clearAuthCookie(cookies);
		redirect(302, '/');
	}
};
