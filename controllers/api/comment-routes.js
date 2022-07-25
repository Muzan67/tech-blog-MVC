const router = require("express").Router();
const { Comment, User } = require("../../models");
const { apiAuth } = require("../../utils/auth");

router.get("/", (req, res) => {
  Comment.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", apiAuth, (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", apiAuth, (req, res) => {
  Comment.destroy({
    where: {
      comment_id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
