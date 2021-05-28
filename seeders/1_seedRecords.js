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
        time: 7200,
        recordName: "Coding",
        userId: 2,
      },
      {
        day: 5,
        week: 1,
        time: 32300,
        recordName: "Coding",
        userId: 5,
      },
      {
        day: 3,
        week: 1,
        time: 10801,
        recordName: "Coding",
        userId: 2,
      },
      {
        day: 6,
        week: 1,
        time: 36000,
        recordName: "Coding",
        userId: 3,
      },
      {
        day: 6,
        week: 1,
        time: 89999,
        recordName: "Coding",
        userId: 4,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("records", null, {});
  },
};
