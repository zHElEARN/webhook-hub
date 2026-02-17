<script lang="ts">
	import ConfirmDeleteModal from '$lib/components/ConfirmDeleteModal.svelte';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
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
	<title>全部日志 · Webhook Hub</title>
</svelte:head>

<section class="page-container py-8">
	<div class="mb-6">
		<h2 class="text-lg font-semibold tracking-tight">全部日志</h2>
		<p class="mt-1 text-sm text-zinc-600">按时间倒序展示所有 webhook 调用记录。</p>
	</div>

	{#if data.logs.length === 0}
		<Alert>
			<AlertDescription>暂无日志</AlertDescription>
		</Alert>
	{:else}
		<Table.Root class="min-w-[940px]">
			<Table.Header>
				<Table.Row>
					<Table.Head>ID</Table.Head>
					<Table.Head>Config ID</Table.Head>
					<Table.Head>Config Name</Table.Head>
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
						<Table.Cell>
							{#if log.configId}
								<Button
									href={`/dashboard/logs/${log.configId}`}
									variant="link"
									class="font-mono text-xs"
								>
									{log.configId}
								</Button>
							{:else}
								<span class="text-muted-foreground">已删除配置</span>
							{/if}
						</Table.Cell>
						<Table.Cell>{log.configName ?? '已删除配置'}</Table.Cell>
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
