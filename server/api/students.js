const router = require("express").Router();
const { Student, User } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  console.log("req.user: ", req.user);
  try {
    const students = await User.findOne({
      where: {
        id: req.user.id
      },
      include: Student
    });

    res.json(students);
  } catch (err) {
    next(err);
  }
});
