'use strict';
module.exports = (sequelize, DataTypes) => {
  var posts = sequelize.define('posts', {
    subject: DataTypes.TEXT,
    postText: DataTypes.TEXT,
    upVote: DataTypes.INTEGER,
    downVote: DataTypes.INTEGER,
    hotness: DataTypes.DECIMAL
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};