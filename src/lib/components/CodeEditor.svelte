<script lang="ts">
	import { onMount } from 'svelte';
	import { javascript } from '@codemirror/lang-javascript';
	import { basicSetup, EditorView } from 'codemirror';
	import { cn } from '$lib/utils.js';

	let {
		id,
		name,
		value = $bindable(''),
		class: className
	}: {
		id?: string;
		name: string;
		value?: string;
		class?: string;
	} = $props();

	let editorHost: HTMLDivElement | null = null;
	let editorView: EditorView | null = null;

	onMount(() => {
		if (!editorHost) {
			return;
		}

		editorView = new EditorView({
			parent: editorHost,
			doc: value,
			extensions: [
				basicSetup,
				javascript(),
				EditorView.lineWrapping,
				EditorView.updateListener.of((update) => {
					if (!update.docChanged) {
						return;
					}

					const nextValue = update.state.doc.toString();
					if (nextValue !== value) {
						value = nextValue;
					}
				}),
				EditorView.theme({
					'&': {
						height: '100%'
					},
					'.cm-scroller': {
						fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)',
						fontSize: '0.875rem'
					}
				})
			]
		});

		return () => {
			editorView?.destroy();
			editorView = null;
		};
	});

	$effect(() => {
		if (!editorView) {
			return;
		}

		const currentValue = editorView.state.doc.toString();
		if (value === currentValue) {
			return;
		}

		editorView.dispatch({
			changes: {
				from: 0,
				to: currentValue.length,
				insert: value ?? ''
			}
		});
	});
</script>

<div
	{id}
	class={cn(
		'rounded-md border border-input bg-transparent transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
		className
	)}
	data-slot="code-editor"
>
	<div bind:this={editorHost} class="min-h-56"></div>
</div>

<input type="hidden" {name} {value} />
