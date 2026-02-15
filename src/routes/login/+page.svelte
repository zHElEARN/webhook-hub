<script lang="ts">
	let { form } = $props();
</script>

<h1>登录</h1>

<form method="POST">
	<input name="password" type="password" placeholder="管理员密码" required />
	<button type="submit">登录</button>
</form>

{#if form?.error}
	<p>{form.error}</p>
{/if}
