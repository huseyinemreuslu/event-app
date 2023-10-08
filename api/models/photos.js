"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Photos extends Model {
    static associate(models) {
      Photos.belongsTo(models.Events, {
        foreignKey: "eventId",
        onDelete: "CASCADE",
      });
    }
  }
  Photos.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      eventId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Photos",
      timestamps: true,
      paranoid: false,
    }
  );
  return Photos;
};
