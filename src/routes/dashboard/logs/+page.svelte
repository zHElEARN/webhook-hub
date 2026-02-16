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
					<td><a href={`/dashboard/logs/${log.configId}`}>{log.configId}</a></td>
					<td>{log.configName}</td>
					<td>{log.createdAt}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
