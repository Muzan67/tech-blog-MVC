const { Post } = require("../models");

const postdata = [
  {
    comment_id: "Why MVC is so important",
    comment_text:
      "MVS allows developers to maintain a true seperation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
    user_id: 1,
  },
  {
    comment_id: "Authentication vs. Authorization",
    comment_text:
      "There is a difference between Authentication and Authorization. Authentication means confirming your own identity, whereas Authorization means being allowed access to the system.",
    user_id: 2,
  },
  {
    comment_id: "Object-Relational Mapping",
    comment_text:
      "I have really enjoyed learning about ORMs. It's really simplified the way I create queries in SQL!.",
    user_id: 3,
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
