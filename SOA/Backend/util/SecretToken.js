const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, "12345678", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
