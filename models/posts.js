'use strict';
module.exports = (sequelize, DataTypes) => {
  var posts = sequelize.define('posts', {
    subject: DataTypes.TEXT,
    postText: DataTypes.TEXT,
    upVote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downVote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    hotness: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0
    },
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};