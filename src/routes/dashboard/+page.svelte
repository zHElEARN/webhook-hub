<script lang="ts">
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import ConfirmDeleteModal from '$lib/components/ConfirmDeleteModal.svelte';

	let { data } = $props();

	let pendingDeleteConfigId = $state<string | null>(null);
	let deleteModalOpen = $state(false);

	const openDeleteModal = (configId: string) => {
		pendingDeleteConfigId = configId;
		deleteModalOpen = true;
	};

	const closeDeleteModal = () => {
		deleteModalOpen = false;
		pendingDeleteConfigId = null;
	};
</script>

<svelte:head>
	<title>控制台首页 · Webhook Hub</title>
</svelte:head>

<section class="page-container py-8">
	<div class="mb-6 flex items-center justify-between gap-4">
		<h2 class="text-lg font-semibold tracking-tight">配置列表</h2>
		<Button href="/dashboard/create">创建配置</Button>
	</div>

	{#if data.configs.length === 0}
		<Alert>
			<AlertDescription>暂无配置</AlertDescription>
		</Alert>
	{:else}
		<Table.Root class="min-w-[640px]">
			<Table.Header>
				<Table.Row>
					<Table.Head>编号</Table.Head>
					<Table.Head>名称</Table.Head>
					<Table.Head>操作</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.configs as config}
					<Table.Row>
						<Table.Cell class="text-muted-foreground">{config.id}</Table.Cell>
						<Table.Cell class="font-medium">{config.name}</Table.Cell>
						<Table.Cell>
							<div class="flex flex-wrap items-center gap-2">
								<Button href={`/dashboard/edit/${config.id}`} variant="outline" size="sm"
									>编辑</Button
								>
								<Button href={`/dashboard/logs/${config.id}`} variant="outline" size="sm"
									>查看日志</Button
								>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onclick={() => openDeleteModal(config.id)}
								>
									删除
								</Button>
							</div>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	{/if}
</section>

<ConfirmDeleteModal
	open={deleteModalOpen}
	title="确认删除配置"
	message="删除后将无法恢复，且该配置的日志会保留为已删除配置。是否继续？"
	itemLabel="配置 ID"
	itemValue={pendingDeleteConfigId}
	action="?/delete"
	hiddenName="id"
	hiddenValue={pendingDeleteConfigId}
	onCancel={closeDeleteModal}
/>
