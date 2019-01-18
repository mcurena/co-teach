const Sequelize = require("sequelize");
const db = require("../db");

const TeachNStudent = db.define("teachNStudent", {
  seen: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = TeachNStudent;
