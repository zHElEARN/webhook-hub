<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let { children } = $props();
</script>

<main class="h-full bg-white text-zinc-900">
	<header class="border-b border-zinc-200">
		<div class="page-container flex items-center justify-between gap-4 py-4">
			<div class="min-w-0">
				<p class="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">Webhook Hub</p>
				<h1 class="mt-1 truncate text-base font-semibold">控制台</h1>
			</div>

			<nav class="flex items-center gap-2 text-sm">
				<Button href="/dashboard" variant="outline">控制台首页</Button>
				<Button href="/dashboard/logs" variant="outline">查看所有日志</Button>
				<form method="POST" action="/dashboard?/logout">
					<Button type="submit">退出</Button>
				</form>
			</nav>
		</div>
	</header>

	{@render children()}
</main>
