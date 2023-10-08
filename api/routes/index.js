const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/eventsController");
const placesController = require("../controllers/placesController");
const searchController = require("../controllers/searchController");
const citiesController = require("../controllers/citiesController");
const categoriesController = require("../controllers/categoriesController");

router.get("/cities", citiesController.getAllCities);
router.get("/categories", categoriesController.getAllCategories);
// Tüm resimler için
router.use(
  "/uploads",
  express.static("uploads", { extensions: ["jpg", "png", "jpeg", "gif"] })
);
// Tüm etkinlikler için
router.get("/events", eventsController.getAllEvents);
router.get("/events/popular", eventsController.getPopularEvents);
router.get("/events/:id", eventsController.getEventDetails);

router.get("/places", placesController.getPlaces);
router.get("/places/:id", placesController.getPlacesWithEvents);

// Etkinlik araması için
router.get("/search", searchController.searchEvents);

module.exports = router;
