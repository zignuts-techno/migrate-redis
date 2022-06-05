const { getRedisClient } = require('./config');

const sourceURL = 'redis://localhost:6300'; // Source redis server URL
const destinationURL = 'redis://localhost:6301'; // Destination redis server URL

let main = async () => {
	let src = await getRedisClient(sourceURL);
	let dest = await getRedisClient(destinationURL);

	// Get all the keys from the source redis
	src.keys('*').then((data) => {
		console.log(data);
		data.forEach(async (element) => {
			// get the value of the key
			let value = await src.get(element);
			// get the TTL or expiry of the key
			let ttl = await src.ttl(element);

			console.log(value, ttl);
			// if the ttl is -1 then keep the key for indifinite time, else store the key with remaining expiry
			if (ttl < 0) {
				await dest.set(element, value);
			} else {
				await dest.setEx(element, ttl, value);
			}
		});
	});
	// console.log(dest);
	return true;
};

main();
