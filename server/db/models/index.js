const User = require("./user");
const Student = require("./student");
const Group = require("./group");
const GroupedStudent = require("./groupedStudent");
const TeachNStudent = require("./teachNStudent");

Student.belongsToMany(Group, { through: GroupedStudent });
Group.belongsToMany(Student, { through: GroupedStudent });
Student.belongsToMany(User, { through: TeachNStudent });
User.belongsToMany(Student, { through: TeachNStudent });

module.exports = {
  User,
  Student,
  Group,
  GroupedStudent,
  TeachNStudent
};
