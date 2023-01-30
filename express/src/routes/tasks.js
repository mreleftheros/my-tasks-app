const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const Task = require("../model/Task");

router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const results = await Task.getAllByUserId(userId);

    return res.json({ data: results });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = res.locals.user.id;

    const result = await Task.create(title, description, userId);

    return res.status(201).json({ data: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Task.get(id);

    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await Task.update(id, title, description);

    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Task.delete(id);

    return res.json({ data: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/done", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Task.toggle(id);

    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
