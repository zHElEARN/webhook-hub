<script lang="ts">
	let { form } = $props();
</script>

<h1>Login</h1>

<form method="POST">
	<input name="password" type="password" placeholder="Admin password" required />
	<button type="submit">登录</button>
</form>

{#if form?.error}
	<p>{form.error}</p>
{/if}
