<script lang="ts">
	import { scriptExamples, type ScriptExampleType } from '$lib/script-examples';

	let { type }: { type: ScriptExampleType } = $props();
</script>

<details class="rounded-md border border-zinc-200 bg-zinc-50">
	<summary class="cursor-pointer list-none px-3 py-2 text-xs font-medium text-zinc-600">默认示例</summary>
	<div class="overflow-x-auto border-t border-zinc-200 p-3">
		<pre class="text-xs leading-6 text-zinc-700"><code>{scriptExamples[type]}</code></pre>
	</div>
</details>
