<script lang="ts">
	import ScriptExample from '$lib/components/ScriptExample.svelte';

	let { form } = $props();
</script>

<svelte:head>
	<title>创建配置 · Webhook Hub</title>
</svelte:head>

<section class="mx-auto w-full max-w-6xl px-6 py-8">
	<div class="mb-6">
		<h2 class="text-lg font-semibold tracking-tight">创建配置</h2>
		<p class="mt-1 text-sm text-zinc-600">填写名称与脚本后即可创建新的 Webhook 配置。</p>
	</div>

	<form method="POST" class="space-y-6">
		<div class="space-y-2">
			<label for="name" class="block text-sm font-medium text-zinc-700">名称</label>
			<input
				id="name"
				name="name"
				type="text"
				required
				class="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 transition-colors outline-none placeholder:text-zinc-400 focus:border-zinc-400"
			/>
		</div>

		<div class="space-y-2">
			<label for="parserScript" class="block text-sm font-medium text-zinc-700">解析脚本</label>
			<textarea
				id="parserScript"
				name="parserScript"
				required
				class="min-h-56 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 transition-colors outline-none placeholder:text-zinc-400 focus:border-zinc-400"
			></textarea>
			<ScriptExample type="parser" />
		</div>

		<div class="space-y-2">
			<label for="pusherScript" class="block text-sm font-medium text-zinc-700">推送脚本</label>
			<textarea
				id="pusherScript"
				name="pusherScript"
				required
				class="min-h-56 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 transition-colors outline-none placeholder:text-zinc-400 focus:border-zinc-400"
			></textarea>
			<ScriptExample type="pusher" />
		</div>

		<div class="flex items-center gap-3">
			<button
				type="submit"
				class="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
			>
				创建
			</button>
			<a
				href="/dashboard"
				class="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
			>
				取消
			</a>
		</div>

		{#if form?.error}
			<p class="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
				{form.error}
			</p>
		{/if}
	</form>
</section>
