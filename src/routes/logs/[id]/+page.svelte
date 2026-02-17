<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';

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
	<section class="page-container py-8">
		<div class="w-full space-y-8">
			<header class="space-y-2">
				<h1 class="text-2xl font-semibold tracking-tight">日志详情</h1>
				<p class="text-sm text-zinc-600">查看本次请求的原始内容与解析结果。</p>
				<div class="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 sm:gap-6">
					<div class="space-y-1">
						<p class="text-xs text-zinc-500">ID</p>
						<Badge variant="secondary" class="font-mono text-xs">{data.log.id}</Badge>
					</div>
					<div class="space-y-1">
						<p class="text-xs text-zinc-500">创建时间</p>
						<p class="text-sm text-zinc-700">{formatCreatedAt(data.log.createdAt)}</p>
					</div>
				</div>
			</header>

			<div class="h-px w-full bg-border" aria-hidden="true"></div>

			<section class="space-y-2">
				<h2 class="text-base font-medium">解析结果</h2>
				<div class="overflow-x-auto rounded-md bg-muted p-3">
					<pre class="font-mono text-xs leading-6 text-zinc-700"><code
							>{data.log.parsedMessage ?? ''}</code
						></pre>
				</div>
			</section>

			<div class="h-px w-full bg-border" aria-hidden="true"></div>

			<section class="space-y-2">
				<h2 class="text-base font-medium">请求内容（JSON）</h2>
				<div class="overflow-x-auto rounded-md bg-muted p-3">
					<pre class="font-mono text-xs leading-6 text-zinc-700"><code
							>{formatRequestPayload(data.log.requestPayload)}</code
						></pre>
				</div>
			</section>
		</div>
	</section>
</main>
