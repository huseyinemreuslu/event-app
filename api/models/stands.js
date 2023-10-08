"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Stands extends Model {
    static associate(models) {
      Stands.belongsTo(models.Events, {
        foreignKey: "eventId",
        onDelete: "CASCADE",
      });
    }
  }
  Stands.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      eventId: DataTypes.INTEGER,
      group: DataTypes.STRING,
      seatNumber: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Stands",
    }
  );
  return Stands;
};
