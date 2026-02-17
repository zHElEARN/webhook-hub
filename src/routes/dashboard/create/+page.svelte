<script lang="ts">
	import ScriptExample from '$lib/components/ScriptExample.svelte';
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
	import { Textarea } from '$lib/components/ui/textarea';

	let { form } = $props();
</script>

<svelte:head>
	<title>创建配置 · Webhook Hub</title>
</svelte:head>

<section class="mx-auto w-full max-w-6xl px-6 py-8">
	<Card>
		<CardHeader>
			<CardTitle>创建配置</CardTitle>
			<CardDescription>填写名称与脚本后即可创建新的 Webhook 配置。</CardDescription>
		</CardHeader>
		<CardContent>
			<form method="POST" class="space-y-6">
				<div class="space-y-2">
					<Label for="name">名称</Label>
					<Input id="name" name="name" type="text" required />
				</div>

				<div class="space-y-2">
					<Label for="parserScript">解析脚本</Label>
					<Textarea
						id="parserScript"
						name="parserScript"
						required
						class="min-h-56 font-mono text-sm"
					/>
					<ScriptExample type="parser" />
				</div>

				<div class="space-y-2">
					<Label for="pusherScript">推送脚本</Label>
					<Textarea
						id="pusherScript"
						name="pusherScript"
						required
						class="min-h-56 font-mono text-sm"
					/>
					<ScriptExample type="pusher" />
				</div>

				<div class="flex items-center gap-3">
					<Button type="submit">创建</Button>
					<Button href="/dashboard" variant="outline">取消</Button>
				</div>

				{#if form?.error}
					<Alert variant="destructive">
						<AlertDescription>{form.error}</AlertDescription>
					</Alert>
				{/if}
			</form>
		</CardContent>
	</Card>
</section>
