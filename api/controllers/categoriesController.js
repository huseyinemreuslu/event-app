const { Categories } = require("../models");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
