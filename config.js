const { createClient } = require('redis');

// let sourceClient, destinationClient;
let getRedisClient = async (url) => {
	let client = createClient({
		url: url,
	});

	client.on('error', (err) => console.log('Redis Client Error', err));

	await client.connect();

	return client;
};

// let getDest = async () => {
// 	destinationClient = createClient({
// 		url: destinationURL,
// 	});

// 	destinationClient.on('error', (err) =>
// 		console.log('Redis Client Error', err)
// 	);

// 	await destinationClient.connect();
// 	return destinationClient;
// };

module.exports = {
	// sourceClient,
	// destinationClient,
	// getSource,
	// getDest,
	getRedisClient,
};
