const express = require("express");
const authRouter = require("./auth.api");
const blogPostRouter = require("./blogpost.api");
const commentRouter = require("./comment.api");
const userRouter = require("./user.api");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/blogPost", blogPostRouter);
router.use("/comment", commentRouter);
router.use("/user", userRouter);

module.exports = router;
