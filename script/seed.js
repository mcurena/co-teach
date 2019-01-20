"use strict";
const db = require("../server/db");
const { Students } = require("./data");
const { Student, User, Group, GroupedStudent } = require("../server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
    User.create({ email: "cody@email.com", password: "123" }),
    User.create({ email: "murphy@email.com", password: "123" })
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  const students = await Promise.all(
    Students.items.map(student => Student.create(student))
  );
  await Promise.all(students.map(student => student.addUser(users[0])));
  await Promise.all(students.map(student => student.addUser(users[1])));
  console.log(`seeded ${students.length} students`);

  const group1 = await Group.create({ skill: "mainIdea", rating: 3 });
  const group2 = await Group.create({ skill: "authorsPurpose", rating: 2 });
  const group3 = await Group.create({ skill: "traitsEmotions", rating: 2 });
  const group4 = await Group.create({ skill: "contextClues", rating: 1 });
  const group5 = await Group.create({ skill: "pov", rating: 2 });

  await Promise.all([
    GroupedStudent.create({
      groupId: group1.id,
      studentId: 8,
      currentRating: 3
    }),
    GroupedStudent.create({
      groupId: group1.id,
      studentId: 9,
      currentRating: 3
    }),
    GroupedStudent.create({
      groupId: group1.id,
      studentId: 10,
      currentRating: 3
    }),
    GroupedStudent.create({
      groupId: group1.id,
      studentId: 11,
      currentRating: 3
    })
  ]);

  await Promise.all([
    GroupedStudent.create({
      groupId: group2.id,
      studentId: 8,
      currentRating: 2
    }),
    GroupedStudent.create({
      groupId: group2.id,
      studentId: 9,
      currentRating: 2
    }),
    GroupedStudent.create({
      groupId: group2.id,
      studentId: 10,
      currentRating: 2
    }),
    GroupedStudent.create({
      groupId: group2.id,
      studentId: 11,
      currentRating: 2
    })
  ]);

  await Promise.all([
    GroupedStudent.create({
      groupId: group3.id,
      studentId: 8,
      currentRating: 2
    }),
    GroupedStudent.create({
      groupId: group3.id,
      studentId: 9,
      currentRating: 2
    }),
    GroupedStudent.create({
      groupId: group3.id,
      studentId: 10,
      currentRating: 2
    }),
    GroupedStudent.create({
      groupId: group3.id,
      studentId: 11,
      currentRating: 2
    })
  ]);

  await Promise.all([
    GroupedStudent.create({
      groupId: group4.id,
      studentId: 8,
      currentRating: 1
    }),
    GroupedStudent.create({
      groupId: group4.id,
      studentId: 9,
      currentRating: 1
    }),
    GroupedStudent.create({
      groupId: group4.id,
      studentId: 10,
      currentRating: 1
    }),
    GroupedStudent.create({
      groupId: group4.id,
      studentId: 11,
      currentRating: 1
    })
  ]);

  await Promise.all([
    GroupedStudent.create({
      groupId: group5.id,
      studentId: 8,
      currentRating: 2
    }),
    GroupedStudent.create({
      groupId: group5.id,
      studentId: 9,
      currentRating: 2
    }),
    GroupedStudent.create({
      groupId: group5.id,
      studentId: 10,
      currentRating: 2
    }),
    GroupedStudent.create({
      groupId: group5.id,
      studentId: 11,
      currentRating: 2
    })
  ]);
  await Group.addDate(2, "01/10");
  await Group.addDate(2, "01/13");
  await Group.addDate(3, "01/10");
  await Group.addDate(4, "01/10");
  await Group.addDate(4, "01/13");
  await Group.addDate(4, "01/16");
  await Group.addDate(5, "01/10");
  await Group.addDate(5, "01/13");
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
