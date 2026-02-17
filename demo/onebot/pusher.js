/**
 * OneBot 推送器
 * @param {string} message - Parser 返回的文本
 * @param {string} id - 当前日志 ID
 * @param {string} url - 部署站点的基础 URL
 * @param {function} fetch - 原生 Fetch 方法
 */

// 用户配置区域
const ONEBOT_API_URL = 'http://127.0.0.1:3000'; // OneBot API 地址
const ONEBOT_ACCESS_TOKEN = ''; // Access Token (留空则不带)
const CHAT_TYPE = 'group'; // 推送类型: 'group' (群) 或 'private' (私聊)
const CHAT_NUMBER = '12345678'; // 群号 或 QQ号

const detailLink = `${url}/l/${id}`;
const fullMessage = `${message}\n\n${detailLink}`;

let endpoint = '';
let idField = '';

if (CHAT_TYPE === 'group') {
	endpoint = '/send_group_msg';
	idField = 'group_id';
} else if (CHAT_TYPE === 'private') {
	endpoint = '/send_private_msg';
	idField = 'user_id';
} else {
	throw new Error("配置错误: CHAT_TYPE 必须是 'group' 或 'private'");
}

if (isNaN(Number(CHAT_NUMBER))) {
	throw new Error('配置错误: CHAT_NUMBER 必须是数字字符串');
}

const payload = {
	[idField]: CHAT_NUMBER,
	message: [{ type: 'text', data: { text: fullMessage } }]
};

const headers = {
	'Content-Type': 'application/json'
};
if (ONEBOT_ACCESS_TOKEN) {
	headers['Authorization'] = `Bearer ${ONEBOT_ACCESS_TOKEN}`;
}

const response = await fetch(`${ONEBOT_API_URL}${endpoint}`, {
	method: 'POST',
	headers: headers,
	body: JSON.stringify(payload)
});

if (!response.ok) {
	throw new Error(`HTTP 请求失败: ${response.status}`);
}

const data = await response.json();

if (data.status !== 'ok') {
	throw new Error(`OneBot 推送失败: ${data.message || '未知错误'}`);
}

return data;
