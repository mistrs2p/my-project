const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

console.log(redis);
const client = redis.createClient({ host: 'redis', port: 6379 });
console.log('hello');
//client.on('connect', () => {
//	console.log('Connected to Redis');
//});


//retrieve a key from Redis
app.get('/:key', (req, res) => {
	const key  = req.params.key;
	client.get(key, (err, reply) => {
		if (err) {
			console.log(err)
			return res.statue(500).send('Error retrieving value from Redis');
		}
		if (reply) {
			
			return res.status(200).send(reply);
		}
		return res.status(404).send('Key not found');
	});
});

//create redis client
app.post('/:key/:value', (req, res) => {
	const key = req.params.key
	const value = req.params.value
	
	client.set(key, value, (err, reply) => {
		if (err) {
			console.log(err);
			return res.status(500).send('Error setting key-value pair in Redis');
		}
		console.log(value);
		return res.status(200).send(`Key-value pair set successfully in Redis`);
	});
});



//start server
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
