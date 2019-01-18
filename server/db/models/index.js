const User = require("./user");
const Student = require("./student");
const Group = require("./group");
const GroupedStudent = require("./groupedStudent");

Student.belongsToMany(Group, { through: GroupedStudent });
Group.belongsToMany(Student, { through: GroupedStudent });
Student.belongsToMany(User, { through: "TeachNStudent" });
User.belongsToMany(Student, { through: "TeachNStudent" });

module.exports = {
  User,
  Student,
  Group,
  GroupedStudent
};
