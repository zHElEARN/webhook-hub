<script lang="ts">
	import ConfirmDeleteModal from '$lib/components/ConfirmDeleteModal.svelte';

	let { data } = $props();

	let pendingDeleteId = $state<string | null>(null);
	let deleteModalOpen = $state(false);

	const openDeleteModal = (id: string) => {
		pendingDeleteId = id;
		deleteModalOpen = true;
	};

	const closeDeleteModal = () => {
		deleteModalOpen = false;
		pendingDeleteId = null;
	};
</script>

<svelte:head>
	<title>配置日志 · Webhook Hub</title>
</svelte:head>

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
						<th class="px-4 py-3 font-medium">Created At</th>
						<th class="px-4 py-3 font-medium">操作</th>
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
							<td class="px-4 py-3 text-zinc-600"
								>{new Date(log.createdAt).toLocaleString('zh-CN')}</td
							>
							<td class="px-4 py-3">
								<button
									type="button"
									onclick={() => openDeleteModal(log.id)}
									class="inline-flex h-8 items-center justify-center rounded-md border border-zinc-300 px-3 text-zinc-700 transition-colors hover:bg-zinc-50"
								>
									删除
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</section>

<ConfirmDeleteModal
	open={deleteModalOpen}
	title="确认删除日志"
	message="删除后不可恢复，是否继续？"
	itemLabel="日志 ID"
	itemValue={pendingDeleteId}
	action="?/delete"
	hiddenName="id"
	hiddenValue={pendingDeleteId}
	onCancel={closeDeleteModal}
/>
