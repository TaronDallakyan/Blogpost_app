const express = require("express");
const {
  getBlogPostById,
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require("../controllers/blogpost.controller");
const { authenticate } = require("./../middlewares/auth");

const router = express.Router();

router.get("/:id", getBlogPostById);
router.get("/", getBlogPosts);
router.post("/", authenticate, createBlogPost);
router.put("/:id", authenticate, updateBlogPost);
router.delete("/:id", authenticate, deleteBlogPost);

module.exports = router;
