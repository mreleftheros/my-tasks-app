const jwt = require("jsonwebtoken");

const EXPIRATION_SECONDS = 24 * 60 * 60;
const KEY = process.env.JWT;

exports.createToken = args =>
  jwt.sign({ ...args }, KEY, { expiresIn: EXPIRATION_SECONDS });

exports.getDecodedToken = token => jwt.verify(token, KEY);

exports.cookieOptions = {
  maxAge: EXPIRATION_SECONDS * 1000,
  secure: true,
  httpOnly: true,
  sameSite: "Lax",
};
