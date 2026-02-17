const targetUrl = 'http://localhost:5173/api/echo';
const link = `${url}/l/${id}`;
const textWithLink = `${message}\n\n${link}`;

await fetch(targetUrl, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({ message: textWithLink })
});
