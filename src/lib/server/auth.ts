import { createHash } from 'node:crypto';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';
import { dev } from '$app/environment';

const ADMIN_COOKIE_NAME = 'admin_auth';

function sha256(value: string): string {
	return createHash('sha256').update(value).digest('hex');
}

function getAdminPassword(): string {
	if (!env.ADMIN_PASSWORD) {
		throw new Error('ADMIN_PASSWORD is not set');
	}

	return env.ADMIN_PASSWORD;
}

export function getAdminPasswordHash(): string {
	return sha256(getAdminPassword());
}

export function isAuthenticated(cookies: Cookies): boolean {
	const token = cookies.get(ADMIN_COOKIE_NAME);
	if (!token) return false;

	return token === getAdminPasswordHash();
}

export function setAuthCookie(cookies: Cookies): void {
	cookies.set(ADMIN_COOKIE_NAME, getAdminPasswordHash(), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: 60 * 60 * 24 * 7
	});
}

export function clearAuthCookie(cookies: Cookies): void {
	cookies.delete(ADMIN_COOKIE_NAME, {
		path: '/'
	});
}
