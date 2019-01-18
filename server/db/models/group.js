const Sequelize = require("sequelize");
const db = require("../db");

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
    type: Sequelize.BOOLEAN
  }
});

module.exports = Group;
