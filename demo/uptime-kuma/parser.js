/**
 * Uptime Kuma Webhook 解析器
 * @param {object} payload - Uptime Kuma 发送的原始 JSON
 */

const monitorName = payload.monitor?.name || '未知监视器';
const statusMsg = payload.msg || '无状态信息';

const message = `[Uptime Kuma]\n监视器: ${monitorName}\n信息: ${statusMsg}`;

return message.trim();
