<script lang="ts">
	import ConfirmDeleteModal from '$lib/components/ConfirmDeleteModal.svelte';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';

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
				配置 ID：<Badge variant="secondary" class="font-mono text-xs">{data.configId}</Badge>
			</p>
		</div>
	</div>

	{#if data.logs.length === 0}
		<Alert>
			<AlertDescription>该配置暂无日志</AlertDescription>
		</Alert>
	{:else}
		<Table.Root class="min-w-[760px]">
			<Table.Header>
				<Table.Row>
					<Table.Head>ID</Table.Head>
					<Table.Head>Created At</Table.Head>
					<Table.Head>操作</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.logs as log}
					<Table.Row>
						<Table.Cell>
							<Button href={`/logs/${log.id}`} variant="link" class="font-mono text-xs">
								{log.id}
							</Button>
						</Table.Cell>
						<Table.Cell class="text-muted-foreground"
							>{new Date(log.createdAt).toLocaleString('zh-CN')}</Table.Cell
						>
						<Table.Cell>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onclick={() => openDeleteModal(log.id)}
							>
								删除
							</Button>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
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
