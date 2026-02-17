<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
</script>

<svelte:head>
	<title>首页 · Webhook Hub</title>
</svelte:head>

<main class="flex flex-1 flex-col bg-white text-zinc-900">
	<section
		class="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center"
	>
		<Card class="w-full max-w-2xl text-left">
			<CardHeader>
				<p class="text-xs font-medium tracking-[0.24em] text-zinc-500 uppercase">Webhook Hub</p>
				<CardTitle class="text-4xl tracking-tight sm:text-5xl">简单管理你的 Webhook</CardTitle>
				<CardDescription class="max-w-xl text-sm leading-7 sm:text-base">
					集中配置、查看回调日志，让 Webhook 管理保持清晰和高效。
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
					<Button href="/dashboard" class="h-11">进入控制台</Button>
					<Button href="/login" variant="outline" class="h-11">登录</Button>
				</div>
			</CardContent>
		</Card>
	</section>
</main>
