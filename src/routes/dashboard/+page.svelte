<script lang="ts">
	let { data } = $props();
</script>

<h1>控制台</h1>

<a href="/dashboard/create">创建配置</a>
<a href="/dashboard/logs">查看全部日志</a>

{#if data.configs.length === 0}
	<p>暂无配置</p>
{:else}
	<table>
		<thead>
			<tr>
				<th>编号</th>
				<th>名称</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody>
			{#each data.configs as config}
				<tr>
					<td>{config.id}</td>
					<td>{config.name}</td>
					<td>
						<a href={`/dashboard/edit/${config.id}`}>编辑</a>
						<a href={`/dashboard/logs/${config.id}`}>查看日志</a>
						<form method="POST" action="?/delete">
							<input type="hidden" name="id" value={config.id} />
							<button type="submit">删除</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<form method="POST" action="?/logout">
	<button type="submit">退出登录</button>
</form>
