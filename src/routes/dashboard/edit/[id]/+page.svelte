<script lang="ts">
	import ScriptExample from '$lib/components/ScriptExample.svelte';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>编辑配置 · Webhook Hub</title>
</svelte:head>

<section class="mx-auto w-full max-w-6xl px-6 py-8">
	<div class="mx-auto w-full max-w-4xl space-y-6">
		<header class="space-y-1">
			<h1 class="text-2xl font-semibold tracking-tight">编辑配置</h1>
			<p class="text-sm text-zinc-600">修改名称与脚本内容后保存。</p>
		</header>

		<form method="POST" class="space-y-6">
			<div class="space-y-2">
				<Label for="id">ID</Label>
				<Input id="id" value={data.config.id} readonly disabled />
			</div>

			<div class="space-y-2">
				<Label for="name">名称</Label>
				<Input id="name" name="name" type="text" value={data.config.name} required />
			</div>

			<div class="space-y-2">
				<Label for="parserScript">解析脚本</Label>
				<Textarea
					id="parserScript"
					name="parserScript"
					value={data.config.parserScript}
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
					value={data.config.pusherScript}
					required
					class="min-h-56 font-mono text-sm"
				/>
				<ScriptExample type="pusher" />
			</div>

			<div class="flex items-center gap-3">
				<Button type="submit">保存</Button>
				<Button href="/dashboard" variant="outline">取消</Button>
			</div>

			{#if form?.error}
				<Alert variant="destructive">
					<AlertDescription>{form.error}</AlertDescription>
				</Alert>
			{/if}
		</form>
	</div>
</section>
