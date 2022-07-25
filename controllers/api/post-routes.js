const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const { apiAuth } = require("../../utils/auth");

// get all users
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
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
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
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
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", apiAuth, (req, res) => {
  // expects {title: 'Tech Blog MVC goes public!', post_url: 'TechBlog MVC', user_id: 1}
  Post.create({
    post_title: req.body.post_title,
    post_text: req.body.post_text,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", apiAuth, (req, res) => {
  Post.update(
    {
      post_title: req.body.post_title,
      post_text: req.body.post_text,
    },
    {
      where: {
        post_id: req.params.id,
        user_id: req.session.user_id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", apiAuth, (req, res) => {
  console.log("id", req.params.id);
  Post.destroy({
    where: {
      post_id: req.params.id,
      user_id: req.params.user_id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
