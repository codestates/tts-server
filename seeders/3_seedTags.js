"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tags",
      [
        {
          tagName: "Beginner",
          time: 0,
        },
        {
          tagName: "Iron",
          time: 5,
        },
        {
          tagName: "Bronze",
          time: 10,
        },
        {
          tagName: "Silver",
          time: 25,
        },
        {
          tagName: "Gold",
          time: 50,
        },
        {
          tagName: "Platinum",
          time: 100,
        },
        {
          tagName: "Diamond",
          time: 150,
        },
        {
          tagName: "Master",
          time: 200,
        },
        {
          tagName: "GrandMaster",
          time: 300,
        },
        {
          tagName: "Challenger",
          time: 500,
        },
      ],
      null,
      ["tagName", "time"]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
