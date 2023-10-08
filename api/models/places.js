"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Places extends Model {
    static associate(models) {
      Places.hasMany(models.Events, {
        foreignKey: "placeId",
      });
    }
  }
  Places.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Places",
    }
  );
  return Places;
};
