"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("records", [
      {
        day: 1,
        week: 1,
        time: 3600,
        recordName: "Coding",
        userId: 1,
      },
      {
        day: 1,
        week: 1,
        time: 3600,
        recordName: "Coding",
        userId: 2,
      },
      {
        day: 5,
        week: 1,
        time: 1000,
        recordName: "Coding",
        userId: 5,
      },
      {
        day: 1,
        week: 1,
        time: 3600,
        recordName: "Coding",
        userId: 2,
      },
      {
        day: 3,
        week: 1,
        time: 3600,
        recordName: "Coding",
        userId: 2,
      },
      {
        day: 5,
        week: 1,
        time: 10000,
        recordName: "Coding",
        userId: 5,
      },
      {
        day: 5,
        week: 1,
        time: 3600,
        recordName: "Coding",
        userId: 2,
      },
      {
        day: 5,
        week: 1,
        time: 3600,
        recordName: "Coding",
        userId: 2,
      },
      {
        day: 5,
        week: 1,
        time: 1,
        recordName: "Coding",
        userId: 2,
      },
      {
        day: 5,
        week: 1,
        time: 15000,
        recordName: "Coding",
        userId: 5,
      },
      {
        day: 6,
        week: 1,
        time: 36000,
        recordName: "Coding",
        userId: 3,
      },
      {
        day: 5,
        week: 1,
        time: 300,
        recordName: "Coding",
        userId: 5,
      },
      {
        day: 6,
        week: 1,
        time: 46800,
        recordName: "Coding",
        userId: 4,
      },
      {
        day: 6,
        week: 1,
        time: 43199,
        recordName: "Coding",
        userId: 4,
      },
      {
        day: 5,
        week: 1,
        time: 5000,
        recordName: "Coding",
        userId: 5,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("follows", null, {});
  },
};
