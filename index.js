
const express = require('express');

//set up the app
const app = express();

const postsRoute = require('./routes/posts')

app.use('/v1', postsRoute);
app.get('/alive', (req, res) => {
  res.status(200);
  res.json({ message: 'alive' });
});

app.listen(process.env.PORT || 3000);

module.exports = app;
