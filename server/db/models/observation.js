const Sequelize = require("sequelize");
const db = require("../db");
const Student = require("./student");

const Observation = db.define("observation", {
  skill: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 4
    }
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  method: {
    type: Sequelize.ENUM("Individual", "Group", "Formal", "Informal"),
    allowNull: false,
    defaultValue: "Group"
  },
  note: {
    type: Sequelize.TEXT
  }
});

Observation.createNew = async function(info) {
  const { skill, rating, date, method, note, user, student } = info;
  const obs = await Observation.create({
    skill,
    rating,
    date,
    method,
    note
  });
  await obs.setUser(user);
  await obs.setStudent(student);
  if (info.group) {
    await obs.setGroup(info.group);
  }
  const studentInstance = await Student.findById(student);
  studentInstance.update({ [skill]: rating });
  return obs;
};

module.exports = Observation;
