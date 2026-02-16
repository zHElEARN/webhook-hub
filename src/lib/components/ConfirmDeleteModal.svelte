<script lang="ts">
	type Props = {
		open: boolean;
		title: string;
		message: string;
		itemLabel?: string;
		itemValue?: string | null;
		cancelText?: string;
		confirmText?: string;
		action?: string;
		hiddenName?: string;
		hiddenValue?: string | null;
		onCancel: () => void;
	};

	let {
		open,
		title,
		message,
		itemLabel,
		itemValue = null,
		cancelText = '取消',
		confirmText = '确认删除',
		action = '?/delete',
		hiddenName = 'id',
		hiddenValue = null,
		onCancel
	}: Props = $props();
</script>

{#if open && hiddenValue}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/30 px-4">
		<div class="w-full max-w-md rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
			<h3 class="text-base font-semibold text-zinc-900">{title}</h3>
			<p class="mt-2 text-sm text-zinc-600">{message}</p>
			{#if itemLabel && itemValue}
				<p class="mt-1 font-mono text-xs text-zinc-700">{itemLabel}：{itemValue}</p>
			{/if}

			<div class="mt-5 flex items-center justify-end gap-2">
				<button
					type="button"
					onclick={onCancel}
					class="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
				>
					{cancelText}
				</button>
				<form method="POST" {action}>
					<input type="hidden" name={hiddenName} value={hiddenValue} />
					<button
						type="submit"
						class="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
					>
						{confirmText}
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}
