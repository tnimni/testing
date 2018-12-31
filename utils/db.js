const db = require('../models');

const limit = { limit: 100 };
const order = { order: ['hotness', 'createdAt', 'desc'] };

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

const upVote = async (id) => {
  try {
    const result = await db.posts.findById(id);
    await result.increment('upVote');
  }
  catch (error) {
    throw new Error('unable to update vote');
  }
}

const downVote = async (id) => {
  try {
    const result = await db.posts.findById(id);
    await result.decrement('downVote');
  }
  catch (error) {
    throw new Error('unable to update vote');
  }
}

module.exports = {
  getTopPosts,
  addPost,
  upVote,
};
