const postsDbService = require('../utils/db');
const redis = require('../utils/redis');
const hotCalculator = require('../utils/hotness');

const addPost = async (req, res) => {
  try {
    const { subject, postText } = req.body;
    const hotness = hotCalculator.getHotness(new Date().getTime() /1000, 0, 0);
    if (!subject || !postText)
      throw new Error('subject and text are mandatory');
    const result = await postsDbService.addPost({ subject, postText, hotness });
    const redisSaved = await redis.addPost(result);
    res.status(204);
    res.json({ message: 'post created' });
  }
  catch (error) {
    console.log(error);
    res.status(500);
    res.json({ message: error });
  }
};

const editPost = (req, res) => {

};

const getPosts = async (req, res) => {
  try {
    const redisResult = await redis.getTopPosts();
    res.json({ posts: [redisResult || result] });
  }
  catch (error) {
    console.log(error);
    res.status(500);
    res.json({ message: 'unable to load posts' });
  }
};

const deletePost = (req, res) => {
  
};

const getPostById = (req, res) => {

};

const upVote = (req, res) => {

}

const downVote = (req, res) => {

}

module.exports = {
  addPost,
  editPost,
  getPosts,
  deletePost,
  getPostById,
  upVote,
  downVote,
};
