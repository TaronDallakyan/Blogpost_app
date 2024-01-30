const errorHandler = (error, req, res, next) => {
  const message = error.message || "Internal server error";
  res.status(500).send(message);
};

module.exports = errorHandler;
