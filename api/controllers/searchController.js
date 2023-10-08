const { Events } = require("../models");

exports.searchEvents = async (req, res) => {
  try {
    const { query } = req.query;
    const events = await Events.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: "%" + query + "%" } },
          // Diğer arama alanlarınızı buraya ekleyebilirsiniz
        ],
      },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
