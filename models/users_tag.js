"use strict";
const { Model } = require("sequelize");
const user = require("../models/user");
module.exports = (sequelize, DataTypes) => {
  class users_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users_tag.init(
    {
      userId: DataTypes.INTEGER,
      reference: {
        model: user,
        key: "id",
      },
      tagId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users_tag",
    }
  );
  return users_tag;
};
