const Sequelize = require("sequelize");
const db = require("../db");

const GroupedStudent = db.define("groupedStudent", {
  currentRating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 4
    }
  }
});

module.exports = GroupedStudent;
