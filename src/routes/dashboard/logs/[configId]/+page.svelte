<script lang="ts">
	let { data } = $props();
</script>

<h1>配置日志</h1>
<p>Config Name: {data.configName}</p>
<p>Config ID: {data.configId}</p>

<a href="/dashboard">返回控制台</a>
<a href="/dashboard/logs">查看全部日志</a>

{#if data.logs.length === 0}
	<p>该配置暂无日志</p>
{:else}
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Config ID</th>
				<th>Created At</th>
			</tr>
		</thead>
		<tbody>
			{#each data.logs as log}
				<tr>
					<td>{log.id}</td>
					<td>{log.configId}</td>
					<td>{log.createdAt}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
