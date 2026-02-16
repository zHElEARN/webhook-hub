<script lang="ts">
	import './layout.css';
	// import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<!-- <svelte:head><link rel="icon" href={favicon} /></svelte:head> -->
<div class="flex min-h-screen flex-col">
	<div class="flex flex-1 flex-col">
		{@render children()}
	</div>

	<footer class="px-6 pb-8 text-center text-xs text-zinc-500">
		由
		<a
			href="https://github.com/zHElEARN"
			target="_blank"
			rel="noreferrer"
			class="underline underline-offset-2 transition-colors hover:text-zinc-700"
		>
			Zhe_Learn
		</a>
		制作（由
		<a
			href="https://github.com/features/copilot"
			target="_blank"
			rel="noreferrer"
			class="underline underline-offset-2 transition-colors hover:text-zinc-700"
		>
			Copilot
		</a>
		辅助完成） ·
		<a
			href="https://github.com/zHElEARN/webhook-hub"
			target="_blank"
			rel="noreferrer"
			class="underline underline-offset-2 transition-colors hover:text-zinc-700"
		>
			开源地址
		</a>
	</footer>
</div>
