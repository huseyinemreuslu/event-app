const { Places, Events } = require("../models");

exports.getPlaces = async (req, res) => {
  const { filter, page, pageSize } = JSON.parse(req.query.filter);
  try {
    const pageNumber = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(pageSize, 10) || 10;
    const offset = (pageNumber - 1) * itemsPerPage;
    const places = await Places.findAndCountAll({
      distinct: true,
      include: [Events],
    });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getPlacesWithEvents = async (req, res) => {
  try {
    const { id } = req.params;

    const places = await Places.findByPk(id, {
      include: [Events],
    });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
