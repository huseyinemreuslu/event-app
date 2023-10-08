const { Op } = require("sequelize");
const {
  Events,
  Photos,
  Stands,
  Categories,
  Cities,
  Places,
} = require("../models");

exports.getAllEvents = async (req, res) => {
  try {
    const { filter, page, pageSize } = JSON.parse(req.query.filter);

    const pageNumber = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(pageSize, 10) || 10;
    const offset = (pageNumber - 1) * itemsPerPage;

    const whereClause = {
      finishedAt: filter.archived
        ? { [Op.lt]: new Date() }
        : { [Op.gte]: new Date() },
    };

    const events = await Events.findAndCountAll({
      distinct: true,
      include: [Photos, Stands, Categories, Cities, Places],
      where: whereClause,
      order: filter.archived
        ? [["finishedAt", "DESC"]]
        : [["startedAt", "ASC"]],
      limit: itemsPerPage,
      offset: offset,
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getPopularEvents = async (req, res) => {
  try {
    const events = await Events.findAll({ limit: 5 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getEventDetails = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Events.findByPk(eventId, {
      include: [Photos, Stands, Categories, Cities, Places],
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
