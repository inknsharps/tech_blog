const sequelize = require("../config/connection.js");
const { Comment } = require("../models");

const commentData = [
    {
        userId: 1,
        postId: 2,
        commentContent: "I like this post!"
    },
    {
        userId: 2,
        postId: 1,
        commentContent: "This post made me cringe."
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
