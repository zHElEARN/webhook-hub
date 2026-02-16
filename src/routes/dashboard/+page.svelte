<script lang="ts">
	let { data } = $props();
</script>

<section class="mx-auto w-full max-w-6xl px-6 py-8">
	<div class="mb-6 flex items-center justify-between gap-4">
		<h2 class="text-lg font-semibold tracking-tight">配置列表</h2>
		<a
			href="/dashboard/create"
			class="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
		>
			创建配置
		</a>
	</div>

	{#if data.configs.length === 0}
		<div class="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-6 text-sm text-zinc-600">暂无配置</div>
	{:else}
		<div class="overflow-x-auto rounded-md border border-zinc-200">
			<table class="w-full min-w-[640px] text-left text-sm">
				<thead class="bg-zinc-50 text-zinc-600">
					<tr>
						<th class="px-4 py-3 font-medium">编号</th>
						<th class="px-4 py-3 font-medium">名称</th>
						<th class="px-4 py-3 font-medium">操作</th>
					</tr>
				</thead>
				<tbody>
					{#each data.configs as config}
						<tr class="border-t border-zinc-200">
							<td class="px-4 py-3 text-zinc-600">{config.id}</td>
							<td class="px-4 py-3 font-medium text-zinc-900">{config.name}</td>
							<td class="px-4 py-3">
								<div class="flex flex-wrap items-center gap-2">
									<a
										href={`/dashboard/edit/${config.id}`}
										class="inline-flex h-8 items-center justify-center rounded-md border border-zinc-300 px-3 text-zinc-700 transition-colors hover:bg-zinc-50"
									>
										编辑
									</a>
									<a
										href={`/dashboard/logs/${config.id}`}
										class="inline-flex h-8 items-center justify-center rounded-md border border-zinc-300 px-3 text-zinc-700 transition-colors hover:bg-zinc-50"
									>
										查看日志
									</a>
									<form method="POST" action="?/delete">
										<input type="hidden" name="id" value={config.id} />
										<button
											type="submit"
											class="inline-flex h-8 items-center justify-center rounded-md border border-zinc-300 px-3 text-zinc-700 transition-colors hover:bg-zinc-50"
										>
											删除
										</button>
									</form>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</section>
