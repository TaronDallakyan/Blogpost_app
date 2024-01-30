const express = require("express");
const {
  register,
  login,
  logout,
  refreshUserSession,
} = require("../controllers/auth.controller");
const { authenticate } = require("./../middlewares/auth");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/authValidator");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", authenticate, logout);
router.post("/refreshUserSession", authenticate, refreshUserSession);

module.exports = router;
