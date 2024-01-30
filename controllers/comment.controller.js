const commentService = require("../services/comment.service");

const getCommentsByBlogPostId = async (req, res) => {
  try {
    const { blogPostId } = req.params;

    const data = await commentService.getCommentsByBlogPostId(blogPostId);

    if (!data) {
      return res.status(400).json({ message: "Comment is not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createComment = async (req, res) => {
  try {
    const blogPostId = req.params.blogPostId;
    const comment = req.body;

    const data = await commentService.createComment(blogPostId, {
      ...comment,
      author: req.user.userId,
    });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getComment = async (req, res) => {
  try {
    const { commentId, blogPostId } = req.params;

    const data = await commentService.getComment(blogPostId, commentId);

    if (!data) {
      return res.status(400).json({ message: "Comment is not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { blogPostId, commentId } = req.params;
    const { body } = req;

    const data = await commentService.updateComment(
      blogPostId,
      commentId,
      req.user.userId,
      body
    );

    if (!data) {
      return res.status(400).json({ message: "Comment is not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { blogPostId, commentId } = req.params;

    const data = await commentService.deleteComment(
      blogPostId,
      commentId,
      req.user.userId
    );

    if (!data) {
      return res.status(400).json({ message: "Comment is not found" });
    }

    return res
      .status(200)
      .json({ message: "Comment was successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCommentsByBlogPostId,
  getComment,
  createComment,
  deleteComment,
  updateComment,
};
