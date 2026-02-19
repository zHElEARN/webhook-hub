/**
 * SMTP 邮件推送器
 * @param {string} message - Parser 返回的文本
 * @param {string} id - 当前日志 ID
 * @param {string} url - 部署站点的基础 URL
 * @param {object} nodemailer - nodemailer 模块
 */

// 用户配置区域
const SMTP_HOST = 'smtp.example.com';
const SMTP_PORT = 465; // 常见: 465(SSL) / 587(TLS)
const SMTP_SECURE = true; // 465 通常为 true, 587 通常为 false
const SMTP_USER = 'your-account@example.com';
const SMTP_PASS = 'your-smtp-password-or-app-password';

const MAIL_FROM = 'Webhook Hub <your-account@example.com>';
const MAIL_TO = 'receiver@example.com';
const MAIL_SUBJECT = '[Webhook Hub] 新消息通知';

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_FROM || !MAIL_TO) {
	throw new Error('配置错误: SMTP_HOST / SMTP_USER / SMTP_PASS / MAIL_FROM / MAIL_TO 不能为空');
}

const detailLink = `${url}/l/${id}`;
const textBody = `${message}\n\n详情: ${detailLink}`;
const htmlBody = `
	<div>
		<p>${message}</p>
		<p><a href="${detailLink}">${detailLink}</a></p>
	</div>
`;

const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	secure: SMTP_SECURE,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS
	}
});

await transporter.verify();

const info = await transporter.sendMail({
	from: MAIL_FROM,
	to: MAIL_TO,
	subject: MAIL_SUBJECT,
	text: textBody,
	html: htmlBody
});

return {
	messageId: info.messageId,
	accepted: info.accepted,
	rejected: info.rejected
};
