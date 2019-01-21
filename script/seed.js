"use strict";
const db = require("../server/db");
const { Students, Observations } = require("./data");
const { Student, User, Group, Observation } = require("../server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
    User.create({
      name: "Cody",
      email: "cody@email.com",
      password: "123",
      initials: "CD"
    }),
    User.create({
      name: "Murphy",
      email: "murphy@email.com",
      password: "123",
      initials: "MC"
    }),
    User.create({
      name: "Michelle",
      email: "michelle@email.com",
      password: "tuna",
      initials: "MU"
    }),
    User.create({
      name: "Emily",
      email: "emily@email.com",
      password: "horatio",
      initials: "ER"
    })
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  const students = await Promise.all(
    Students.items.map(student => Student.create(student))
  );

  await Promise.all(students.map(student => student.addUser(users[0])));
  await Promise.all(students.map(student => student.addUser(users[1])));
  await Promise.all(students.map(student => student.addUser(users[2])));
  await Promise.all(students.map(student => student.addUser(users[3])));
  console.log(`seeded ${students.length} students`);

  await Promise.all(Observations.items.map(obs => Observation.createNew(obs)));
  console.log(`seeded observations`);

  await Group.createNew([1, 2, 3, 4], "mainIdea", 3);
  const group2 = await Group.createNew([5, 6, 7, 8], "authorsPurpose", 2);
  const group3 = await Group.createNew([9, 10, 11, 12], "traitsEmotions", 2);
  const group4 = await Group.createNew([13, 14, 15, 16], "pov", 2);
  const group5 = await Group.createNew([17, 18, 19, 20], "contextClues", 1);

  await Group.addDate(2, "01/10");
  await Group.addDate(2, "01/13");
  await Group.addDate(3, "01/10");
  await Group.addDate(4, "01/10");
  await Group.addDate(4, "01/13");
  await Group.addDate(5, "01/10");
  await Group.addDate(5, "01/13");
  await Group.addDate(5, "01/16");

  await Promise.all([
    group2.setUser(users[1]),
    group3.setUser(users[2]),
    group4.setUser(users[3]),
    group5.setUser(users[0])
  ]);
  console.log("seeded 4 groups with dates and users");
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
