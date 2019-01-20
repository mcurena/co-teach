const Sequelize = require("sequelize");
const db = require("../db");
const Student = require("./student");
const GroupedStudent = require("./groupedStudent");

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
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  notes: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

Group.createNew = async function(ids, skill, rating) {
  const groupInstance = await Group.create({ skill, rating });
  const students = await Promise.all(
    ids.map(id => {
      Student.findById(id);
    })
  );
  const newGroup = await Promise.all(
    students.map(student => {
      GroupedStudent.create({
        groupId: groupInstance.id,
        studentId: student.id,
        currentRating: rating
      });
    })
  );
  return newGroup;
};

Group.addDate = async function(id, date) {
  const group = await Group.findById(id);
  let dates;
  if (group.dates) {
    dates = group.dates.concat([date]);
  } else {
    dates = [date];
  }

  await group.update({ dates });
  return group;
};

Group.addNote = async function(id, note) {
  const group = await Group.findById(id);
  await group.update({ notes: [...group.notes, note] });
  return group;
};

Group.complete = async function(id) {
  const group = await Group.findById(id);
  await group.update({ active: false });
  return group;
};

module.exports = Group;
