<script lang="ts">
	import { scriptExamples, type ScriptExampleType } from '$lib/script-examples';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	let { type }: { type: ScriptExampleType } = $props();
	let expanded = $state(false);
</script>

<div class="space-y-2">
	<Button type="button" variant="outline" size="sm" onclick={() => (expanded = !expanded)}>
		{expanded ? '收起示例' : '默认示例'}
	</Button>

	{#if expanded}
		<Card class="bg-muted/50">
			<CardHeader class="pb-3">
				<CardTitle class="text-xs">脚本示例</CardTitle>
			</CardHeader>
			<CardContent class="overflow-x-auto">
				<pre class="text-xs leading-6 text-zinc-700"><code>{scriptExamples[type]}</code></pre>
			</CardContent>
		</Card>
	{/if}
</div>
