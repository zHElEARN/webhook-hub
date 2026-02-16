<script lang="ts">
	let { data } = $props();

	const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	function normalizeCreatedAt(value: string): string {
		if (value.includes('T') && (value.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(value))) {
			return value;
		}

		if (value.length === 19 && value[10] === ' ') {
			return `${value.replace(' ', 'T')}Z`;
		}

		return value;
	}

	function formatCreatedAt(value: string): string {
		const normalizedCreatedAt = normalizeCreatedAt(value);
		const createdAtDate = new Date(normalizedCreatedAt);

		if (Number.isNaN(createdAtDate.getTime())) {
			return value;
		}

		return createdAtDate.toLocaleString(undefined, {
			timeZone: currentTimeZone,
			timeZoneName: 'short'
		});
	}
</script>

<h1>日志详情</h1>

<p><strong>ID:</strong> {data.log.id}</p>
<p><strong>请求内容:</strong></p>
<pre><code>{data.log.requestPayload ?? ''}</code></pre>
<p><strong>解析结果:</strong></p>
<pre><code>{data.log.parsedMessage ?? ''}</code></pre>
<p><strong>创建时间:</strong> {formatCreatedAt(data.log.createdAt)}</p>
<p><strong>当前时区:</strong> {currentTimeZone}</p>
