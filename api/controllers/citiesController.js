const { Cities } = require("../models");

exports.getAllCities = async (req, res) => {
  try {
    const cities = await Cities.findAll();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
