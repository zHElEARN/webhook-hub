<script lang="ts">
	let { data } = $props();
</script>

<section class="mx-auto w-full max-w-6xl px-6 py-8">
	<div class="mb-6">
		<h2 class="text-lg font-semibold tracking-tight">配置日志</h2>
		<div class="mt-2 space-y-1 text-sm text-zinc-600">
			<p>
				配置名称：<span class="font-medium text-zinc-900">{data.configName}</span>
			</p>
			<p>
				配置 ID：<span class="font-mono text-xs text-zinc-700">{data.configId}</span>
			</p>
		</div>
	</div>

	{#if data.logs.length === 0}
		<div class="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-6 text-sm text-zinc-600">
			该配置暂无日志
		</div>
	{:else}
		<div class="overflow-x-auto rounded-md border border-zinc-200">
			<table class="w-full min-w-[760px] text-left text-sm">
				<thead class="bg-zinc-50 text-zinc-600">
					<tr>
						<th class="px-4 py-3 font-medium">ID</th>
						<th class="px-4 py-3 font-medium">Config ID</th>
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
							<td class="px-4 py-3 font-mono text-xs text-zinc-700">{log.configId}</td>
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
