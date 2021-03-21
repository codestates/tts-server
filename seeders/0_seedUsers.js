"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        email: "test1@testT.com",
        password: "1234",
        userName: "tester1",
      },
      {
        email: "test2@testT.com",
        password: "1234",
        userName: "tester2",
      },
      {
        email: "test3@testT.com",
        password: "1234",
        userName: "tester3",
      },
      {
        email: "test4@testT.com",
        password: "1234",
        userName: "tester4",
      },
      {
        email: "test5@testT.com",
        password: "1234",
        userName: "tester5",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
