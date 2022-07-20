const seedUser = require("./user-seed");
const seedPost = require("./comment-seed");
const seedComment = require("./post-seed");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPost();

  await seedComment();

  process.exit(0);
};

seedAll();
