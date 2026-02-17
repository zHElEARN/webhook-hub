CREATE TABLE `webhook_configs` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`parser_script` text NOT NULL,
	`pusher_script` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `webhook_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`config_id` text,
	`request_payload` text,
	`parsed_message` text,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	FOREIGN KEY (`config_id`) REFERENCES `webhook_configs`(`id`) ON UPDATE no action ON DELETE set null
);
