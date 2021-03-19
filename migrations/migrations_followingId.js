"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // field 추가
    await queryInterface.addColumn("follows", "followingId", Sequelize.INTEGER);

    // foreing key 연결
    await queryInterface.addConstraint("follows", {
      fields: ["followingId"],
      type: "foreign key",
      name: "FK_follows_followingId",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("follows", "FK_follows_followingId");

    await queryInterface.removeColumn("follows", "followingId");
  },
};
