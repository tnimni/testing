const bluebird = require('bluebird');
const rejson = require('iorejson');
const client = new rejson();

client.on('error', (error) => {
  console.log(error);
});

client.on('connect', () => {
  console.log('redis connected');
});

const getTopPosts = async () => {
  const redisResult = await client.get('posts');
  return redisResult;
}

module.exports = {
  client,
  getTopPosts,
};