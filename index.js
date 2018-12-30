
const express = require('express');
const redis = require('./utils/redis').client;

//set up the app
const app = express();
app.use(express.json());

const postsRoute = require('./routes/posts')

app.use('/v1', postsRoute);
app.get('/alive', (req, res) => {
  res.status(200);
  res.json({ message: 'alive' });
});

(async () => {
  try {
    const redisResult = await redis.get('posts');
    if (!redisResult)
      await redis.set('posts', '.', []);
  }
  catch (error) {
    console.log(error);
  }
})();

app.listen(process.env.PORT || 3000);

module.exports = app;
