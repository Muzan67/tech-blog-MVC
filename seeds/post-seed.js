const { Post } = require("../models");

const postdata = [
  {
    title: "Leaf Ninja",
    description: "Ninjas who serve and protect the Leaf Village.",
    user_id: 1,
  },
  {
    title: "Hokage",
    description:
      "Leader of the Leaf Village who governs all aspects of the ninja way.",
    user_id: 2,
  },
  {
    title: "Sage of Six Paths",
    description:
      "The one who created the ninja way as well as control all elements.",
    user_id: 3,
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
