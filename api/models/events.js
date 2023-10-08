// Events.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      Events.hasMany(models.Photos, {
        foreignKey: "eventId",
      });
      Events.hasMany(models.Stands, {
        foreignKey: "eventId",
      });
      Events.belongsTo(models.Cities, {
        foreignKey: "cityId",
        onDelete: "CASCADE",
      });
      Events.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
      });
      Events.belongsTo(models.Places, {
        foreignKey: "placeId",
        onDelete: "CASCADE",
      });
    }
  }
  Events.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      categoryId: DataTypes.INTEGER, // categoryId ekleyin
      address: DataTypes.STRING, // address ekleyin
      location: DataTypes.STRING, // location ekleyin
      cityId: DataTypes.INTEGER, // cityId ekleyin
      placeId: DataTypes.INTEGER, // placeId ekleyin
      startedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      finishedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Events",
      timestamps: true,
      paranoid: false,
    }
  );
  return Events;
};
