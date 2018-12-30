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

const addPost = async (data) => {
  const redisResult = await client.arrlen('posts', '.');
  if (redisResult === 30)
    await client.arrpop('posts');
  return await client.arrappend('posts', '.', data);
}

module.exports = {
  client,
  getTopPosts,
  addPost,
};