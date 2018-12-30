const db = require('../models');

const limit = { limit: 100 };
const order = { order: ['createdAt', 'desc'] };

const getTopPosts = async () => {
  try {
    const result = await db.posts.findAll(limit, order);
    return result;
  }
  catch (error) {
    throw new Error(error);
  }
}

const addPost = async (data) => {
  try {
    const result = await db.posts.create(data);
    return result;
  }
  catch (error) {
    throw new Error('unable to add post');
  }
}

module.exports = {
  getTopPosts,
  addPost,
};
