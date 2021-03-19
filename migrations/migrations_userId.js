"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // field 추가
    await queryInterface.addColumn("records", "userId", Sequelize.INTEGER);
    await queryInterface.addColumn("follows", "userId", Sequelize.INTEGER);
    await queryInterface.addColumn("users_tags", "userId", Sequelize.INTEGER);

    // foreing keyy 연결
    await queryInterface.addConstraint("records", {
      fields: ["userId"],
      type: "foreign key",
      name: "FK_records_userId",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("follows", {
      fields: ["userId"],
      type: "foreign key",
      name: "FK_follows_userId",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("users_tags", {
      fields: ["userId"],
      type: "foreign key",
      name: "FK_users_tags_userId",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("records", "FK_records_userId");
    await queryInterface.removeConstraint("follows", "FK_follows_userId");
    await queryInterface.removeConstraint("users_tags", "FK_users_tags_userId");

    await queryInterface.removeColumn("records", "userId");
    await queryInterface.removeColumn("follows", "userId");
    await queryInterface.removeColumn("users_tags", "userId");
  },
};
