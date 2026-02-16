<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>全部日志 · Webhook Hub</title>
</svelte:head>

<section class="mx-auto w-full max-w-6xl px-6 py-8">
	<div class="mb-6">
		<h2 class="text-lg font-semibold tracking-tight">全部日志</h2>
		<p class="mt-1 text-sm text-zinc-600">按时间倒序展示所有 webhook 调用记录。</p>
	</div>

	{#if data.logs.length === 0}
		<div class="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-6 text-sm text-zinc-600">
			暂无日志
		</div>
	{:else}
		<div class="overflow-x-auto rounded-md border border-zinc-200">
			<table class="w-full min-w-[860px] text-left text-sm">
				<thead class="bg-zinc-50 text-zinc-600">
					<tr>
						<th class="px-4 py-3 font-medium">ID</th>
						<th class="px-4 py-3 font-medium">Config ID</th>
						<th class="px-4 py-3 font-medium">Config Name</th>
						<th class="px-4 py-3 font-medium">Created At</th>
					</tr>
				</thead>
				<tbody>
					{#each data.logs as log}
						<tr class="border-t border-zinc-200">
							<td class="px-4 py-3">
								<a
									href={`/logs/${log.id}`}
									class="inline-flex rounded px-1 py-0.5 font-mono text-xs text-zinc-700 underline underline-offset-2 transition-colors hover:text-zinc-900"
								>
									{log.id}
								</a>
							</td>
							<td class="px-4 py-3 text-zinc-700">
								{#if log.configId}
									<a
										href={`/dashboard/logs/${log.configId}`}
										class="inline-flex rounded px-1 py-0.5 font-mono text-xs text-zinc-700 underline underline-offset-2 transition-colors hover:text-zinc-900"
									>
										{log.configId}
									</a>
								{:else}
									<span class="text-zinc-500">已删除配置</span>
								{/if}
							</td>
							<td class="px-4 py-3 text-zinc-900">{log.configName ?? '已删除配置'}</td>
							<td class="px-4 py-3 text-zinc-600"
								>{new Date(log.createdAt).toLocaleString('zh-CN')}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</section>
