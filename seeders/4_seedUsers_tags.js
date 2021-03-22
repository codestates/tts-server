"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users_tags", [
      {
        tagId: 1,
        userId: 1,
      },
      {
        tagId: 1,
        userId: 2,
      },
      {
        tagId: 2,
        userId: 2,
      },
      {
        tagId: 1,
        userId: 3,
      },
      {
        tagId: 2,
        userId: 3,
      },
      {
        tagId: 3,
        userId: 3,
      },
      {
        tagId: 3,
        userId: 4,
      },
      {
        tagId: 1,
        userId: 5,
      },
      {
        tagId: 2,
        userId: 5,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users_tags", null, {});
  },
};
