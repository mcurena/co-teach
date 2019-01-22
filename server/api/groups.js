const router = require("express").Router();
const { Group, Student, User } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const groups = await Group.findAll({
        include: [{ model: Student }, { model: User }]
      });
      res.json(groups);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/addNote", async (req, res, next) => {
  try {
    if (req.user) {
      const group = await Group.addNote(req.body.id, req.body.note);
      res.json(group);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/assignUser", async (req, res, next) => {
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

router.put("/addDate", async (req, res, next) => {
  try {
    if (req.user) {
      await Group.addDate(req.body.id, req.body.date);
      const group = await Group.findById(req.body.id, {
        include: [{ model: Student }, { model: User }]
      });
      console.log(group);
      res.json(group);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    if (req.user) {
      const newGroup = await Group.createNew(
        req.body.ids,
        req.body.skill,
        req.body.rating
      );
      const groupToSend = await Group.findById(newGroup.id, {
        include: [{ model: Student }, { model: User }]
      });
      res.json(groupToSend);
    }
  } catch (err) {
    next(err);
  }
});
