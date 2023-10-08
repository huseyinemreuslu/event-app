import React, { useState, useEffect } from "react";
import {
  fetchPlaces,
  fetchCities,
  fetchEvents,
  fetchCategories,
} from "../services/api";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Dropdown,
  DropdownButton,
  Pagination,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({
    date: "",
    type: "",
    place: "",
    city: "",
    category: "",
  });
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);
  const [totalEvents, setTotalEvents] = useState(0);
  const history = useHistory();

  useEffect(() => {
    loadEvents();
    loadCities();
    loadPlaces();
    loadCategories();
  }, [currentPage]); // Sayfa numarası değiştiğinde etkinlikleri yeniden yükle

  const loadEvents = async () => {
    try {
      console.log("LOADED");
      const eventData = await fetchEvents({
        page: currentPage,
        pageSize: eventsPerPage,
        filter,
      });
      setEvents(eventData.rows);
      setTotalEvents(eventData.count);
    } catch (error) {
      console.error("Etkinlikler alınamadı:", error);
    }
  };

  const loadCities = async () => {
    try {
      const cityData = await fetchCities();
      setCities(cityData);
    } catch (error) {
      console.error("Şehirler alınamadı:", error);
    }
  };

  const loadPlaces = async () => {
    try {
      const placeData = await fetchPlaces({
        page: 0,
        pageSize: 100,
        filter,
      });
      setPlaces(placeData.rows);
      console.log(placeData);
    } catch (error) {
      console.error("Mekanlar alınamadı:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Mekanlar alınamadı:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    setCurrentPage(1); // Filtreleri uyguladığınızda sayfayı sıfırla
  };

  const handleNavigate = (eventId) => {
    // Yönlendirme işlemi
    history.push(`/events/${eventId}`); // "/other-page" URL'sine yönlendirir
  };

  // Sayfa değiştirme işlevleri
  const paginate = async (pageNumber) => {
    setCurrentPage(pageNumber);
    await loadEvents();
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <h3 className="mt-4">Etkinlik Listesi</h3>
      <br />
      <Row className="mb-4">
        <Col md={2}>
          <Form.Control
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
            placeholder="Tarih"
          />
        </Col>
        <Col md={2} bg="none">
          <DropdownButton
            id="categories-dropdown"
            variant="none"
            title={filter.category ? filter.category : "Kategori Seç"}
          >
            {categories.map((category) => (
              <Dropdown.Item
                key={category.id}
                onClick={() =>
                  setFilter({ ...filter, category: category.name })
                }
              >
                {category.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col md={2} bg="none">
          <DropdownButton
            id="place-dropdown"
            variant="none"
            title={filter.place ? filter.place : "Mekan Seç"}
          >
            {places.map((place) => (
              <Dropdown.Item
                key={place.id}
                onClick={() => setFilter({ ...filter, place: place.name })}
              >
                {place.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col md={2} bg="none">
          <DropdownButton
            id="city-dropdown"
            variant="none"
            title={filter.city ? filter.city : "Şehir Seç"}
          >
            {cities.map((city) => (
              <Dropdown.Item
                key={city.id}
                onClick={() => setFilter({ ...filter, city: city.name })}
              >
                {city.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>

        <Col md={1}>
          <Button variant="dark" onClick={applyFilters}>
            Filtrele
          </Button>
        </Col>
      </Row>
      <Row>
        {events.map((event) => (
          <Col key={event.id} md={12} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={
                  event.Photos[0]
                    ? `http://localhost:3000/api/uploads/${event.Photos[0].id}.jpg`
                    : `http://localhost:3000/api/uploads/sample.jpg`
                }
                alt={event.name}
                style={{ height: "200px" }}
              />
              <Card.Body>
                <Row>
                  <Col>
                    <Row>
                      <Col md={8}>
                        <Card.Title className="mb-3">{event.name}</Card.Title>
                      </Col>
                      <Col md={4}>
                        {new Date(event.startedAt).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        -
                        {new Date(event.finishedAt).toLocaleDateString(
                          "tr-TR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </Col>
                    </Row>
                    <div className="border-top my-3"></div>{" "}
                    <Card.Subtitle className="mt-1 mb-2">
                      Açıklama
                    </Card.Subtitle>
                    <Card.Text>{event.description}</Card.Text>
                    <Card.Subtitle className="mt-1 mb-2">Adres</Card.Subtitle>
                    <Row>
                      <Col md={9}>
                        <Card.Text>{event.address}</Card.Text>
                      </Col>
                      <Col md={3}>
                        <Card.Text>{event.City.name}</Card.Text>
                      </Col>
                    </Row>
                    <div className="border-top my-3"></div>{" "}
                  </Col>
                </Row>
                <Row>
                  <Col md={11}>
                    {/* Mekan bilgisi burada */}
                    {places
                      .filter((place) => place.id === event.placeId)
                      .map((place) => (
                        <span key={place.id}>{place.name}</span>
                      ))}
                  </Col>
                  <Col md={1}>
                    <Button
                      className="bg-dark"
                      onClick={() => handleNavigate(event.id)}
                    >
                      İncele
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center mt-4">
          <Pagination>
            {pageNumbers.map((pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
