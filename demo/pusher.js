const targetUrl = 'http://localhost:5173/api/echo';

await fetch(targetUrl, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({ message })
});
