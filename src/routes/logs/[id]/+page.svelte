<script lang="ts">
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

<main class="min-h-screen bg-white text-zinc-900">
	<section class="mx-auto w-full max-w-5xl px-6 py-8">
		<div class="mb-6">
			<h1 class="text-lg font-semibold tracking-tight">日志详情</h1>
			<p class="mt-1 text-sm text-zinc-600">查看本次请求的原始内容与解析结果。</p>
		</div>

		<div class="space-y-6">
			<div class="space-y-1">
				<p class="text-xs text-zinc-500">ID</p>
				<p class="font-mono text-xs text-zinc-700">{data.log.id}</p>
				<p class="pt-2 text-xs text-zinc-500">创建时间</p>
				<p class="text-sm text-zinc-700">{formatCreatedAt(data.log.createdAt)}</p>
			</div>

			<div>
				<h2 class="text-sm font-medium text-zinc-900">请求内容（JSON）</h2>
				<div class="mt-3 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 p-3">
					<pre class="font-mono text-xs leading-6 text-zinc-700"><code
							>{formatRequestPayload(data.log.requestPayload)}</code
						></pre>
				</div>
			</div>

			<div>
				<h2 class="text-sm font-medium text-zinc-900">解析结果</h2>
				<div class="mt-3 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 p-3">
					<pre class="font-mono text-xs leading-6 text-zinc-700"><code
							>{data.log.parsedMessage ?? ''}</code
						></pre>
				</div>
			</div>
		</div>
	</section>
</main>
