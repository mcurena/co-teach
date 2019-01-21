const router = require("express").Router();
const { Group, Student, User } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      include: [{ model: Student }, { model: User }]
    });

    res.json(groups);
  } catch (err) {
    next(err);
  }
});

router.post("/addNote", async (req, res, next) => {
  try {
    if (req.user) {
      const group = await Group.addNote(req.body.id, req.body.note);
      res.json(group);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/assignUser", async (req, res, next) => {
  try {
    if (req.user) {
      const group = await Group.findById(req.body.id);
      await group.setUser(req.user.id);
      const updatedGroup = await Group.findById(req.body.id, {
        include: [{ model: Student }, { model: User }]
      });
      res.json(updatedGroup);
    }
  } catch (err) {
    next(err);
  }
});
