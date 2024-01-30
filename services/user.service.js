const User = require("../db/models/user.model");

const getUserInfo = async (userId) => {
  return await User.findById(userId);
};

module.exports = { getUserInfo };
