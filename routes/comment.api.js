const express = require("express");
const {
  createComment,
  getCommentsByBlogPostId,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.get("/:blogPostId/:commentId", authenticate, getComment);
router.put("/:blogPostId/:commentId", authenticate, updateComment);
router.delete("/:blogPostId/:commentId", authenticate, deleteComment);
router.post("/:blogPostId", authenticate, createComment);
router.get("/:blogPostId", authenticate, getCommentsByBlogPostId);

module.exports = router;
