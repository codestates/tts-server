"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // field 추가
    await queryInterface.addColumn("users_tags", "tagId", Sequelize.INTEGER);

    // foreing key 연결
    await queryInterface.addConstraint("users_tags", {
      fields: ["tagId"],
      type: "foreign key",
      name: "FK_users_tags_tagId",
      references: {
        table: "tags",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("users_tags", "FK_users_tags_tagId");

    await queryInterface.removeColumn("users_tags", "tagId");
  },
};
