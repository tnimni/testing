const postsDbService = require('./db');
const rejson = require('iorejson');
const client = new rejson();

client.on('error', (error) => {
  console.log(error);
});

client.on('connect', () => {
  console.log('redis connected');
});

const getTopPosts = async () => {
  let result = await client.get('posts');
  if (!result || result.length === 0)
    result = await fillRedisFromDb();
  return result;
}

const fillRedisFromDb = async () => {
  const result = await postsDbService.getTopPosts();
  await client.set('posts', '.', result);
  return result;
}

const rePopulateRedis = async () => {
  try {
  await client.del('posts', '.');
  await fillRedisFromDb();
  }
  catch (error) {
    console.log(error);
  }
}

const addPost = async (data) => {
  const redisResult = await client.arrlen('posts', '.');
  if (redisResult === 30)
    await client.arrpop('posts');
  return await client.arrappend('posts', '.', data);
}

module.exports = {
  addPost,
  client,
  fillRedisFromDb,
  getTopPosts,
  rePopulateRedis,
};