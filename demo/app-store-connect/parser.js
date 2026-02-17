/**
 * App Store Connect Webhook 解析器
 * @param {object} payload - 原始 JSON 数据
 */

const eventData = payload.data;
if (!eventData) {
	return '[App Store Connect]\n收到无效数据 (缺少 data 字段)';
}

const type = eventData.type;
const attributes = eventData.attributes || {};

// 辅助函数: 格式化时间 (保持与原项目一致的上海时区)
function formatTime(isoString) {
	if (!isoString) return '未知时间';
	try {
		return new Date(isoString).toLocaleString('zh-CN', {
			timeZone: 'Asia/Shanghai'
		});
	} catch (e) {
		return isoString;
	}
}

let message = '';

switch (type) {
	case 'appStoreVersionAppVersionStateUpdated': {
		// 提取状态变更信息
		const oldStatus = attributes.oldValue || '未知';
		const newStatus = attributes.newValue || '未知';
		const timeStr = formatTime(attributes.timestamp);

		// 组装消息 (不包含 ID 链接)
		message = `[App Store Connect]\n状态变更\n\n旧状态: ${oldStatus}\n新状态: ${newStatus}\n时间: ${timeStr}`;
		break;
	}

	case 'webhookPingCreated': {
		// 提取 Ping 测试信息
		const timeStr = formatTime(attributes.timestamp);

		// 组装消息
		message = `[App Store Connect]\n测试 Ping\n\n接收时间: ${timeStr}`;
		break;
	}

	default: {
		// 处理未知的事件类型
		message = `[App Store Connect]\n收到未知事件类型 (${type})`;
	}
}

return message;
