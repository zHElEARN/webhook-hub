import { inspect } from 'node:util';

type LogDetails = Record<string, unknown>;
type LogLevel = 'INFO' | 'WARN' | 'ERROR';

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();

function formatValue(value: unknown): string {
	if (value === undefined) {
		return 'undefined';
	}

	if (value === null) {
		return 'null';
	}

	if (typeof value === 'string') {
		return `"${normalizeWhitespace(value)}"`;
	}

	if (value instanceof Error) {
		return `"${normalizeWhitespace(value.message)}"`;
	}

	if (typeof value === 'object') {
		return inspect(value, { depth: 3, compact: true, breakLength: Infinity, sorted: true }).replace(
			/\s+/g,
			' '
		);
	}

	return String(value);
}

function formatDetails(details: LogDetails): string {
	const entries = Object.entries(details);
	if (!entries.length) {
		return '';
	}

	return entries.map(([key, value]) => `${key}=${formatValue(value)}`).join(' ');
}

function writeLog(level: LogLevel, route: string, event: string, details: LogDetails = {}) {
	const timestamp = new Date().toISOString();
	const detailText = formatDetails(details);
	const line = `${timestamp} ${level} ${route} ${event}${detailText ? ` ${detailText}` : ''}`;

	if (level === 'ERROR') {
		console.error(line);
		return;
	}

	if (level === 'WARN') {
		console.warn(line);
		return;
	}

	console.log(line);
}

export function createRouteLogger(route: string) {
	return {
		info: (event: string, details: LogDetails = {}) => writeLog('INFO', route, event, details),
		warn: (event: string, details: LogDetails = {}) => writeLog('WARN', route, event, details),
		error: (event: string, details: LogDetails = {}) => writeLog('ERROR', route, event, details)
	};
}

export function getErrorMessage(error: unknown) {
	return error instanceof Error ? error.message : 'Unknown error';
}
