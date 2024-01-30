const User = require("../db/models/user.model");
const jwt = require("jsonwebtoken");
const UserSession = require("../db/models/userSession.model");

const register = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const login = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    return null;
  }

  const passwordMatch = await user.comparePassword(password);

  if (!passwordMatch) {
    return null;
  }

  const token = await generateUserSession(user._id);

  return token;
};

const logout = async (userId, accessToken) => {
  return await UserSession.updateOne(
    { userId, accessToken },
    { active: false }
  );
};

const changePassword = async (username, oldPassword, newPassword) => {
  const user = await User.findOne({ username });

  if (!user) {
    return null;
  }

  const passwordMatch = await user.comparePassword(oldPassword);

  if (!passwordMatch) {
    return null;
  }

  user.password = newPassword;

  return await user.save();
};

const generateUserSession = async (userId) => {
  return await new UserSession({
    userId,
    accessToken: jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    }),
    refreshToken: jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "1 day",
    }),
    active: true,
  }).save();
};

const refreshUserSession = async (userId, refreshToken) => {
  const userSession = await UserSession.findOne({
    userId,
    refreshToken,
    active: true,
  });

  if (userSession) {
    userSession.active = false;
    await userSession.save();
    return generateUserSession(userId);
  }

  throw new Error("UserSession not found");
};

module.exports = {
  register,
  login,
  logout,
  generateUserSession,
  refreshUserSession,
  changePassword,
};
