const express = require("express");
const { authenticate } = require("../middlewares/auth");
const {
  getUserInfo,
  changePassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.get("/profile", authenticate, getUserInfo);
router.put("/changePassword", authenticate, changePassword);

module.exports = router;
