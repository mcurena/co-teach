const User = require("./user");
const Student = require("./student");
const Group = require("./group");
const GroupedStudent = require("./groupedStudent");
const TeachNStudent = require("./teachNStudent");
const Observation = require("./observation");

Student.belongsToMany(Group, { through: GroupedStudent });
Group.belongsToMany(Student, { through: GroupedStudent });
Student.belongsToMany(User, { through: TeachNStudent });
User.belongsToMany(Student, { through: TeachNStudent });
Group.belongsTo(User);
Observation.belongsTo(User);
Observation.belongsTo(Student);
Observation.belongsTo(Group);

module.exports = {
  User,
  Student,
  Group,
  GroupedStudent,
  TeachNStudent,
  Observation
};
