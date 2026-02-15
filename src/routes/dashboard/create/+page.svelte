<script lang="ts">
	let { form } = $props();
</script>

<h1>创建配置</h1>

<form method="POST">
	<div>
		<label for="name">名称</label>
		<input id="name" name="name" type="text" required />
	</div>

	<div>
		<label for="parserScript">解析脚本</label>
		<textarea id="parserScript" name="parserScript" required></textarea>
	</div>

	<div>
		<label for="pusherScript">推送脚本</label>
		<textarea id="pusherScript" name="pusherScript" required></textarea>
	</div>

	<button type="submit">创建</button>
	<a href="/dashboard">取消</a>
</form>

{#if form?.error}
	<p>{form.error}</p>
{/if}
