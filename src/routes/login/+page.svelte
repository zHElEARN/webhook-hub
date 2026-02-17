<script lang="ts">
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let { form } = $props();
</script>

<svelte:head>
	<title>登录 · Webhook Hub</title>
</svelte:head>

<main class="flex h-full items-center justify-center bg-white px-6 py-16 text-zinc-900">
	<section class="w-full max-w-sm">
		<Card>
			<CardHeader>
				<p class="text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">Webhook Hub</p>
				<CardTitle class="mt-2 text-2xl tracking-tight">登录</CardTitle>
				<CardDescription>请输入管理员密码后继续。</CardDescription>
			</CardHeader>
			<CardContent>
				<form method="POST" class="space-y-3">
					<div class="space-y-2">
						<Label for="password">管理员密码</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="请输入密码"
							required
						/>
					</div>
					<Button type="submit" class="h-11 w-full">登录</Button>
				</form>

				{#if form?.error}
					<Alert variant="destructive" class="mt-4">
						<AlertDescription>{form.error}</AlertDescription>
					</Alert>
				{/if}
			</CardContent>
		</Card>
	</section>
</main>
