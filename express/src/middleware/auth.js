const User = require("../model/User");
const { getDecodedToken } = require("../utils/token");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies["auth-token"];
    if (!token) {
      return res.status(401).json({ error: "Unauthenticated user" });
    }
    const decoded = getDecodedToken(token);

    const result = await User.get(decoded.id);
    res.locals.user = result;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
