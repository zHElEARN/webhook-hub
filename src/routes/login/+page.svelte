<script lang="ts">
	let { form } = $props();
</script>

<svelte:head>
	<title>登录 · Webhook Hub</title>
</svelte:head>

<main class="flex h-full items-center justify-center bg-white px-6 py-16 text-zinc-900">
	<section class="w-full max-w-sm">
		<p class="text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">Webhook Hub</p>
		<h1 class="mt-3 text-2xl font-semibold tracking-tight">登录</h1>
		<p class="mt-2 text-sm text-zinc-600">请输入管理员密码后继续。</p>

		<form method="POST" class="mt-6 space-y-3">
			<label for="password" class="block text-sm font-medium text-zinc-700">管理员密码</label>
			<input
				id="password"
				name="password"
				type="password"
				placeholder="请输入密码"
				required
				class="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 transition-colors outline-none placeholder:text-zinc-400 focus:border-zinc-400"
			/>
			<button
				type="submit"
				class="inline-flex h-11 w-full items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
			>
				登录
			</button>
		</form>

		{#if form?.error}
			<p class="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
				{form.error}
			</p>
		{/if}
	</section>
</main>
