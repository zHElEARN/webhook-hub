<script lang="ts">
	let { data } = $props();
</script>

<h1>全部日志</h1>

<a href="/dashboard">返回控制台</a>

{#if data.logs.length === 0}
	<p>暂无日志</p>
{:else}
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Config ID</th>
				<th>Config Name</th>
				<th>Created At</th>
			</tr>
		</thead>
		<tbody>
			{#each data.logs as log}
				<tr>
					<td>{log.id}</td>
					<td>
						{#if log.configId}
							<a href={`/dashboard/logs/${log.configId}`}>{log.configId}</a>
						{:else}
							已删除配置
						{/if}
					</td>
					<td>{log.configName ?? '已删除配置'}</td>
					<td>{log.createdAt}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
