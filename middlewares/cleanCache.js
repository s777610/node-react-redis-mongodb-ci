const { clearHash } = require("../services/cache");

module.exports = async (req, res, next) => {
  // make sure call next(), which is route handler
  await next();

  // After route handler completed, clear cache
  clearHash(req.user.id);
};
