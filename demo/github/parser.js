/**
 * GitHub Webhook 解析器
 * @param {object} payload - GitHub 发送的原始 JSON
 */

const repository = payload.repository?.full_name || '未知仓库';
const pusher = payload.pusher?.name || '未知用户';

let message = `GitHub Webhook\n仓库: ${repository}\n推送者: ${pusher}`;

const commits = payload.commits || [];

if (commits.length > 0) {
	message += '\n';
	for (const commit of commits) {
		const authorName = commit.author?.name || '未知作者';
		const commitMsg = commit.message || '无提交信息';
		// 格式: [作者] 提交信息
		message += `\n[${authorName}] ${commitMsg}`;
	}
}

return message;
