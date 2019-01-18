const router = require("express").Router();
const { Student } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const students = await Student.findAll({
      where: {
        teacherId: req.user.id
      }
    });
    res.json(students);
  } catch (err) {
    next(err);
  }
});
