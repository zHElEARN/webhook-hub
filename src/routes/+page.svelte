<svelte:head>
	<title>首页 · Webhook Hub</title>
</svelte:head>

<main class="flex flex-1 flex-col bg-white text-zinc-900">
	<section
		class="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center"
	>
		<p class="mb-4 text-xs font-medium tracking-[0.24em] text-zinc-500 uppercase">Webhook Hub</p>
		<h1 class="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
			简单管理你的 Webhook
		</h1>
		<p class="mt-4 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
			集中配置、查看回调日志，让 Webhook 管理保持清晰和高效。
		</p>

		<div class="mt-10 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
			<a
				href="/dashboard"
				class="inline-flex h-11 items-center justify-center rounded-md bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
			>
				进入控制台
			</a>
			<a
				href="/login"
				class="inline-flex h-11 items-center justify-center rounded-md border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
			>
				登录
			</a>
		</div>
	</section>
</main>
