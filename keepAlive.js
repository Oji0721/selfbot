const express = require('express');
const app = express();

function keepAlive() {
	app.get('/', (req, res) => {
		 res.send('Hello World!');
	});
	app.listen(3000);
};

module.exports = { keepAlive }