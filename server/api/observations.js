const router = require("express").Router();
const { Observation, Group, Student, User } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const observations = await Observation.findAll({
      include: [{ model: Student }, { model: User }, { model: Group }]
    });

    res.json(observations);
  } catch (err) {
    next(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const observation = await Observation.createNew(req.body);
    res.json(observation);
  } catch (err) {
    next(err);
  }
});
