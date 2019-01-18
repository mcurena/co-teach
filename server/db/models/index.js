const User = require("./user");
const Student = require("./student");
const Group = require("./group");
const GroupedStudent = require("./groupedStudent");

Student.belongsToMany(Group, { through: GroupedStudent });
Group.belongsToMany(Student, { through: GroupedStudent });
Student.belongsToMany(User, { through: "TeachNStudent" });
User.belongsToMany(Student, { through: "TeachNStudent" });
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Student,
  Group,
  GroupedStudent
};
