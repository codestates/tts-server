"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      record.belongsTo(models.user, {
        onDelete: "casacade",
        foreignKey: {
          allowNull: true,
        },
      });
    }
  }
  record.init(
    {
      day: DataTypes.INTEGER,
      time: DataTypes.INTEGER,
      recordName: DataTypes.STRING,
      week: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "record",
    }
  );
  return record;
};
