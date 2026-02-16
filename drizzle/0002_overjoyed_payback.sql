PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_webhook_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`config_id` text,
	`request_payload` text,
	`parsed_message` text,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	FOREIGN KEY (`config_id`) REFERENCES `webhook_configs`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_webhook_logs`("id", "config_id", "request_payload", "parsed_message", "created_at") SELECT "id", "config_id", "request_payload", "parsed_message", "created_at" FROM `webhook_logs`;--> statement-breakpoint
DROP TABLE `webhook_logs`;--> statement-breakpoint
ALTER TABLE `__new_webhook_logs` RENAME TO `webhook_logs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;