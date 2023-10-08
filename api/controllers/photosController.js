const { Photos } = require("../models");

exports.getEventPhotos = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const photos = await Photos.findAll({ where: { eventId } });

    const photoUrls = photos.map((photo) => {
      return `http://yourserver.com/uploads/${photo.name}`;
    });

    res.json(photoUrls);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
