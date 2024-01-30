const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

const register = async (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors.length) {
    return res.json({
      success: false,
      statusCode: 400,
      validationError: errors,
    });
  }

  try {
    const user = await authService.register(req.body);
    const token = await authService.generateUserSession(user._id);

    return res.json(token);
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { username, oldPassword, newPassword } = req.body;

  const result = await authService.changePassword(
    username,
    oldPassword,
    newPassword
  );

  if (result) {
    return res.json({ message: "Password was updated successfully!" });
  }

  return res.json({
    statusCode: 400,
    message: "Incorrect input",
  });
};

const login = async (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors.length) {
    return res.json({
      success: false,
      statusCode: 400,
      validationError: errors,
    });
  }
  const { username, password } = req.body;

  try {
    const token = await authService.login(username, password);
    if (!token) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    return res.json(token);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  const { accessToken, userId } = req.user;

  await authService.logout(userId, accessToken);

  return res.json({ message: "User succesfully logged out" });
};

const getUserInfo = async (req, res) => {
  const { userId } = req.user;

  const result = await userService.getUserInfo(userId);

  return res.json(result);
};

const refreshUserSession = async (req, res, next) => {
  try {
    const token = await authService.refreshUserSession(
      req.user.userId,
      req.body.refreshToken
    );

    return res.json(token);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  changePassword,
  refreshUserSession,
  getUserInfo,
};
