const Sequelize = require("sequelize");
const db = require("../db");
const Student = require("./student");
const GroupedStudent = require("./groupedStudent");
const User = require("./user");

const Group = db.define("group", {
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
  dates: {
    type: Sequelize.STRING,
    defaultValue: "Pending"
  },
  notes: {
    type: Sequelize.STRING,
    defaultValue: "None"
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

Group.createNew = async function(ids, skill, rating) {
  const groupInstance = await Group.create({ skill, rating });
  const students = await Promise.all(ids.map(id => Student.findById(id)));
  await Promise.all(
    students.map(student => {
      GroupedStudent.create({
        groupId: groupInstance.id,
        studentId: student.id,
        currentRating: rating
      });
    })
  );
  await Promise.all(
    students.map(student =>
      student.update({
        currentlyPlaced: true
      })
    )
  );
  return groupInstance;
};

Group.complete = async function(id) {
  const group = await Group.findById(id, { include: Student });
  const students = await Promise.all(
    group.students.map(student => Student.findById(student.id))
  );
  await Promise.all(
    students.map(student => student.update({ currentlyPlaced: false }))
  );
  await group.update({ active: false });
  return group;
};

Group.addDate = async function(id, date) {
  const group = await Group.findById(id);
  if (group.dates === "Pending") {
    await group.update({ dates: date });
  } else {
    const updated = `${group.dates}, ${date}`;
    await group.update({ dates: updated });
    if (group.dates.length > 21) {
      await Group.complete(id);
    }
  }
};

Group.addNote = async function(id, note) {
  const group = await Group.findById(id, {
    include: [{ model: Student }, { model: User }]
  });
  if (group.notes === "None") {
    await group.update({ notes: note });
  } else {
    const updated = `${group.notes} - ${note}`;
    await group.update({ notes: updated });
  }

  return group;
};

module.exports = Group;
