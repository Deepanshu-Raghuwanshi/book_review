const jwt = require("jsonwebtoken");

/**
 * Generate a JWT token for a user
 * @param {string} id - User ID to include in the token
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
};

module.exports = generateToken;
