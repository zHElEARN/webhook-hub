<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

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

{#if hiddenValue}
	<AlertDialog.Root bind:open>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{title}</AlertDialog.Title>
				<AlertDialog.Description>{message}</AlertDialog.Description>
			</AlertDialog.Header>

			{#if itemLabel && itemValue}
				<div>
					<Badge variant="secondary" class="font-mono text-xs">{itemLabel}：{itemValue}</Badge>
				</div>
			{/if}

			<AlertDialog.Footer>
				<AlertDialog.Cancel onclick={onCancel}>{cancelText}</AlertDialog.Cancel>
				<form method="POST" {action}>
					<input type="hidden" name={hiddenName} value={hiddenValue} />
					<Button type="submit" variant="destructive">{confirmText}</Button>
				</form>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
