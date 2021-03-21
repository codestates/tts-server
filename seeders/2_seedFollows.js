"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("follows", [
      {
        followingId: 2,
        userID: 1,
      },
      {
        followingId: 3,
        userID: 1,
      },
      {
        followingId: 4,
        userID: 1,
      },
      {
        followingId: 1,
        userID: 2,
      },
      {
        followingId: 3,
        userID: 2,
      },
      {
        followingId: 1,
        userID: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("follows", null, {});
  },
};
