<script lang="ts">
	import ScriptExample from '$lib/components/ScriptExample.svelte';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let { form } = $props();
	let parserScript = $state('');
	let pusherScript = $state('');
</script>

<svelte:head>
	<title>创建配置 · Webhook Hub</title>
</svelte:head>

<section class="page-container py-8">
	<div class="w-full space-y-6">
		<header class="space-y-1">
			<h1 class="text-2xl font-semibold tracking-tight">创建配置</h1>
			<p class="text-sm text-zinc-600">填写名称与脚本后即可创建新的 Webhook 配置。</p>
		</header>

		<form method="POST" class="space-y-6">
			<div class="space-y-2">
				<Label for="name">名称</Label>
				<Input id="name" name="name" type="text" required />
			</div>

			<div class="space-y-2">
				<Label for="parserScript">解析脚本</Label>
				<CodeEditor
					id="parserScript"
					name="parserScript"
					bind:value={parserScript}
					class="min-h-56 font-mono text-sm"
				/>
				<ScriptExample type="parser" />
			</div>

			<div class="space-y-2">
				<Label for="pusherScript">推送脚本</Label>
				<CodeEditor
					id="pusherScript"
					name="pusherScript"
					bind:value={pusherScript}
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
	</div>
</section>
