const name = payload.name || '未知项目';
const author = payload.author || '匿名作者';

return `[Webhook] 项目 ${name}，作者 ${author}`;
