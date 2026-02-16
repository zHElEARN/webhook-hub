<script lang="ts">
	let { children } = $props();
</script>

<main class="min-h-screen bg-white text-zinc-900">
	<header class="border-b border-zinc-200">
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
			<div class="min-w-0">
				<p class="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">Webhook Hub</p>
				<h1 class="mt-1 truncate text-base font-semibold">控制台</h1>
			</div>

			<nav class="flex items-center gap-2 text-sm">
				<a
					href="/dashboard"
					class="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-3 text-zinc-700 transition-colors hover:bg-zinc-50"
				>
					控制台首页
				</a>
				<a
					href="/dashboard/logs"
					class="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-3 text-zinc-700 transition-colors hover:bg-zinc-50"
				>
					查看所有日志
				</a>
				<form method="POST" action="/dashboard?/logout">
					<button
						type="submit"
						class="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-3 text-white transition-colors hover:bg-zinc-800"
					>
						退出
					</button>
				</form>
			</nav>
		</div>
	</header>

	{@render children()}
</main>
