import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const webhookConfigs = sqliteTable('webhook_configs', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	parserScript: text('parser_script').notNull(),
	pusherScript: text('pusher_script').notNull()
});

export const webhookLogs = sqliteTable('webhook_logs', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	configId: text('config_id').references(() => webhookConfigs.id, { onDelete: 'set null' }),
	requestPayload: text('request_payload'),
	parsedMessage: text('parsed_message'),
	createdAt: text('created_at')
		.notNull()
		.default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`)
});
