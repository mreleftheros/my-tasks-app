const { verifyToken } = require("../middleware/auth");
const User = require("../model/User");
const { createToken, cookieOptions } = require("../utils/token");

const router = require("express").Router();

router.post("/signup", async (req, res) => {
  try {
    const emailExists = await User.getByEmail(req.body.email);
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const user = await User.signup(
      req.body.username,
      req.body.email,
      req.body.password
    );

    const token = createToken({ id: user.id });

    res.cookie("auth-token", token, cookieOptions);

    return res.status(201).json({ data: user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error, result } = await User.login(
      req.body.email,
      req.body.password
    );
    if (error) {
      return res.status(400).json({ error: "Incorrect credentials" });
    }

    const token = createToken({ id: result.id });

    res.cookie("auth-token", token, cookieOptions);

    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/me", verifyToken, (req, res) => {
  try {
    if (!res.locals.user) {
      return res.status(401).json({ error: "Unauthenticated user" });
    }

    return res.json({ data: res.locals.user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/logout", (req, res) => {
  try {
    res.clearCookie("auth-token");

    return res.json({ data: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
