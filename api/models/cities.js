"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    static associate(models) {
      Cities.hasMany(models.Events, {
        foreignKey: "cityId",
      });
    }
  }
  Cities.init(
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
      modelName: "Cities",
    }
  );
  return Cities;
};
