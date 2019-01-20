const router = require("express").Router();
const { Group, Student } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const groups = await Group.findAll({ include: Student });

    res.json(groups);
  } catch (err) {
    next(err);
  }
});
