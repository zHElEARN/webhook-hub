<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	let { data } = $props();

	const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	function normalizeCreatedAt(value: string): string {
		if (value.includes('T') && (value.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(value))) {
			return value;
		}

		if (value.length === 19 && value[10] === ' ') {
			return `${value.replace(' ', 'T')}Z`;
		}

		return value;
	}

	function formatCreatedAt(value: string): string {
		const normalizedCreatedAt = normalizeCreatedAt(value);
		const createdAtDate = new Date(normalizedCreatedAt);

		if (Number.isNaN(createdAtDate.getTime())) {
			return value;
		}

		return createdAtDate.toLocaleString(undefined, {
			timeZone: currentTimeZone
		});
	}

	function formatRequestPayload(payload: unknown): string {
		if (payload == null) {
			return '';
		}

		if (typeof payload === 'string') {
			try {
				return JSON.stringify(JSON.parse(payload), null, 2);
			} catch {
				return payload;
			}
		}

		return JSON.stringify(payload, null, 2);
	}
</script>

<svelte:head>
	<title>日志详情 · Webhook Hub</title>
</svelte:head>

<main class="h-full bg-white text-zinc-900">
	<section class="mx-auto w-full max-w-5xl px-6 py-8">
		<div class="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>日志详情</CardTitle>
					<CardDescription>查看本次请求的原始内容与解析结果。</CardDescription>
				</CardHeader>
				<CardContent class="space-y-3">
					<div class="space-y-1">
						<p class="text-xs text-zinc-500">ID</p>
						<Badge variant="secondary" class="font-mono text-xs">{data.log.id}</Badge>
					</div>
					<div class="space-y-1">
						<p class="text-xs text-zinc-500">创建时间</p>
						<p class="text-sm text-zinc-700">{formatCreatedAt(data.log.createdAt)}</p>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="text-base">请求内容（JSON）</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="overflow-x-auto rounded-md bg-muted p-3">
						<pre class="font-mono text-xs leading-6 text-zinc-700"><code
								>{formatRequestPayload(data.log.requestPayload)}</code
							></pre>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="text-base">解析结果</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="overflow-x-auto rounded-md bg-muted p-3">
						<pre class="font-mono text-xs leading-6 text-zinc-700"><code
								>{data.log.parsedMessage ?? ''}</code
							></pre>
					</div>
				</CardContent>
			</Card>
		</div>
	</section>
</main>
