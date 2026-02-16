export type ScriptExampleType = 'parser' | 'pusher';

export const parserScriptDefault = `/**
 * 解析器脚本 (Parser Script)
 * * 上下文环境 (Context):
 * @param {object} payload - 接收到的原始 Webhook JSON 数据
 * * 目标:
 * 从 payload 中提取关键信息，拼接成一个字符串并 return。
 */

// 示例：安全地获取字段（防止 undefined 报错）
// 假设 payload 是 { "repository": { "name": "my-project" }, "pusher": { "name": "zachary" } }
const repo = payload.repository?.name || '未知项目';
const user = payload.pusher?.name || '匿名用户';
const action = payload.action || '提交了代码';

// 组装最终要推送的消息文本
const message = \`[Webhook] 项目 \${repo} 收到来自 \${user} 的更新：\${action}\`;

// 【必须】返回一个字符串
return message;`;

export const pusherScriptDefault = `/**
 * 推送器脚本 (Pusher Script)
 * * 上下文环境 (Context):
 * @param {string} message - 上一步解析器返回的字符串
 * @param {string} id - 当前日志记录的 id
 * @param {string} url - 当前站点地址（例如 http://localhost:5173）
 * @param {function} fetch - 原生 Fetch API，用于发起 HTTP 请求
 * * 目标:
 * 将 message 封装成目标平台需要的格式，发送 POST 请求。
 */

// 1. 配置目标 URL (例如：企业微信、飞书、钉钉、Server酱)
const targetUrl = "https://example.com/api/send_message";

// 2. 拼接日志详情链接
const link = \`${'${url}'}/l/${'${id}'}\`;
const textWithLink = \`${'${link}'} ${'${message}'}\`;

// 3. 准备请求体 (根据目标平台的文档要求修改结构)
const body = {
	msg_type: "text",
	content: {
		text: textWithLink // 使用带链接的消息
	},
	// 如果需要 Token，可以在这里硬编码，或者使用环境变量
	// token: "your-access-token"
};

// 4. 发起请求 (支持 await)
const response = await fetch(targetUrl, {
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify(body)
});

// 5. 检查结果
if (!response.ok) {
	throw new Error(\`推送失败! HTTP 状态码: \${response.status}\`);
}`;

export const scriptExamples: Record<ScriptExampleType, string> = {
	parser: parserScriptDefault,
	pusher: pusherScriptDefault
};
