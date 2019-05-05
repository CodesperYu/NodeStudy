const fs = require('fs');

function requestHandler(req, res) {
	let url = req.url;
	let method = req.method;
	if (url === '/') {
		res.write('<html>');
		res.write('<head><title>Enter Message</title><head>');
		res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
		res.write('</html>');
		return res.end();
	}
	if (url === '/message' && method === 'POST') {
		const body = [];
		req.on('data', (chunk) => {
			console.log(chunk); // <Buffer 6d 65 73 73 61 67>
			body.push(chunk);
		})
		req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			console.log(parsedBody); // message=fasdf
			const message = parsedBody.split('=')[1];
			fs.writeFile('message.txt', message, err => {
				res.statusCode = 302;
				// res.setHeader('Location', '/');
				return res.end();
			});
		})
		//fs.writeFileSync('message.txt', 'DUMMY');

		res.statusCode = 302;
		res.setHeader('Location', '/');
		return res.end();
	}
	res.setHeader('Content-Type', 'text/html');
	res.write('<html>');
	res.write('<head><title>My First Page</title><head>');
	res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
	res.write('</html>');
	res.end();
}

module.exports = {
	handler: requestHandler,
	text: 'hello'
}