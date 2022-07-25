const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const { withAuth } = require("../utils/auth");

// get all posts for dashboard
router.get("/", withAuth, (req, res) => {
  console.log("======================");
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["post_id", "post_title", "post_text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: [
          "comment_id",
          "comment_text",
          "post_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get edit
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      post_id: req.params.id,
    },
    attributes: ["post_id", "post_title", "post_text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: [
          "comment_id",
          "comment_text",
          "post_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/delete/:id", withAuth, (req, res) => {
  Post.destroy({
    where: { post_id: req.params.id },
  })
    .then(() => {
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
