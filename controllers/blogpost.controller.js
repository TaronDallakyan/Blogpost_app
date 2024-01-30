const blogPostService = require("../services/blogpost.service");

const getBlogPosts = async (req, res) => {
  try {
    const data = await blogPostService.getBlogPosts();

    if (!data) {
      return res.status(400).json({ message: "Blog post is not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const data = await blogPostService.getBlogPostById(id);

      if (!data) {
        return res.status(400).json({ message: "Blog post is not found" });
      }

      return res.status(200).json(data);
    }

    return res.status(400).json({ message: "Blog post ID is required" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createBlogPost = async (req, res) => {
  try {
    const blogPost = req.body;

    const data = await blogPostService.createBlogPost({
      ...blogPost,
      author: req.user.userId,
    });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const data = await blogPostService.updateBlogPost(
      id,
      req.user.userId,
      body
    );

    if (!data) {
      return res.status(400).json({ message: "Blog post is not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const data = await blogPostService.deleteBlogPost(id, req.user.userId);

      if (!data) {
        return res.status(400).json({ message: "Blog post is not found" });
      }

      return res
        .status(200)
        .json({ message: "Blog post was successfully deleted" });
    }

    return res.status(400).json({ message: "Blog post ID is required" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getBlogPostById,
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
