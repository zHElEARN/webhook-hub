<script lang="ts">
	let { data } = $props();
</script>

<h1>日志详情</h1>

<p><strong>ID:</strong> {data.log.id}</p>
<p><strong>请求内容:</strong></p>
<pre><code>{data.log.requestPayload ?? ''}</code></pre>
<p><strong>解析结果:</strong></p>
<pre><code>{data.log.parsedMessage ?? ''}</code></pre>
<p><strong>创建时间:</strong> {data.log.createdAt}</p>
