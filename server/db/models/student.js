const Sequelize = require("sequelize");
const db = require("../db");

const Student = db.define("student", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  level: {
    type: Sequelize.STRING,
    allowNull: true
  },
  authorsPurpose: {
    type: Sequelize.STRING,
    defaultValue: "Not rated"
  },
  mainIdea: {
    type: Sequelize.STRING,
    defaultValue: "Not rated"
  },
  traitsEmotions: {
    type: Sequelize.STRING,
    defaultValue: "Not rated"
  },
  figurativeLanguage: {
    type: Sequelize.STRING,
    defaultValue: "Not rated"
  },
  features: {
    type: Sequelize.STRING,
    defaultValue: "Not rated"
  },
  structures: {
    type: Sequelize.STRING,
    defaultValue: "Not rated"
  },
  contextClues: {
    type: Sequelize.STRING,
    defaultValue: "Not rated"
  },
  theme: {
    type: Sequelize.STRING,
    defaultValue: "Not rated"
  },
  pov: {
    type: Sequelize.STRING,
    defaultValue: "Not rated"
  }
});

module.exports = Student;
