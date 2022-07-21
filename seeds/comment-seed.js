const { Comment } = require("../models");

const commentdata = [
  {
    comment_text: "I am enjoying my bootcamp journey!",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "All the technologies that I am learning is amazing!",
    user_id: 2,
    post_id: 2,
  },
  {
    comment_text: "I hope to learn Python as my next coding language!",
    user_id: 3,
    post_id: 3,
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
