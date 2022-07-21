const { User } = require("../models");

const userdata = [
  {
    username: "kakashi",
    email: "kakashi@senpai.com",
    password: "password123",
  },
  {
    username: "yamato",
    email: "yamato@captain.com",
    password: "password456",
  },
  {
    username: "asuma",
    email: "asuma@hokageson.com",
    password: "password789",
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
