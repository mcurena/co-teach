const router = require("express").Router();
const { User } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const students = await User.findStudents(req.user.id);

    res.json(students);
  } catch (err) {
    next(err);
  }
});
