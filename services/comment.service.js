const BlogPost = require("../db/models/blogpost.model");

const getCommentsByBlogPostId = async (blogPostId) => {
  const blogPost = await BlogPost.findById(blogPostId);

  if (!blogPost) {
    return null;
  }

  return blogPost.comments || [];
};

const getComment = async (blogPostId, commentId) => {
  const comment = await BlogPost.findOne(
    { _id: blogPostId, "comments._id": commentId },
    { "comments.$": 1 }
  );

  return comment;
};

const createComment = async (blogPostId, comment) => {
  const result = await BlogPost.findOneAndUpdate(
    { _id: blogPostId }, // Find the blog post by its ID
    { $push: { comments: comment } }, // Add the new comment to the comments array
    { new: true }
  );

  return result.comments[result.comments.length - 1];
};

const updateComment = async (blogPostId, commentId, userId, body) => {
  const result = await BlogPost.findOneAndUpdate(
    {
      _id: blogPostId, // Find the blog post by its ID
      "comments._id": commentId, // Match the comment by its ID
      "comments.author": userId, // Match the comment by its author ID
    },
    {
      $set: { "comments.$.text": body.text }, // Update the text of the specified comment
    },
    {
      new: true,
    }
  );

  if (result) {
    await result.save();

    return {
      text: body.text,
      author: userId,
      _id: commentId,
    };
  }

  return null;
};

const deleteComment = async (blogPostId, commentId, userId) => {
  const result = await BlogPost.findOneAndUpdate(
    { _id: blogPostId, "comments.author": userId },
    { $pull: { comments: { _id: commentId } } },
    {
      new: true,
    }
  );

  return result;
};

module.exports = {
  getCommentsByBlogPostId,
  getComment,
  createComment,
  deleteComment,
  updateComment,
};
