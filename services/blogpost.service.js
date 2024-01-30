const BlogPost = require("../db/models/blogpost.model");

const getBlogPosts = async () => {
  return await BlogPost.find();
};

const getBlogPostById = async (id) => {
  return await BlogPost.findById(id);
};

const createBlogPost = async (blogPost) => {
  return await new BlogPost(blogPost).save();
};

const updateBlogPost = async (id, userId, body) => {
  return await BlogPost.findOneAndUpdate({ id, author: userId }, body, {
    new: true,
  });
};

const deleteBlogPost = async (id, userId) => {
  return await BlogPost.findOneAndRemove({ id, author: userId });
};

module.exports = {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
