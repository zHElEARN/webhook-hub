import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createRouteLogger, getErrorMessage } from '$lib/server/logger';

const logger = createRouteLogger('/api/echo');

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		logger.info('echo_received', { body });
		return json(body);
	} catch (error) {
		const message = getErrorMessage(error);
		if (message.includes('JSON')) {
			logger.error('invalid_json_payload', { error: message });
			return json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
		}

		logger.error('echo_failed', { error: message });
		return json({ success: false, error: 'Failed to process echo request' }, { status: 500 });
	}
};
