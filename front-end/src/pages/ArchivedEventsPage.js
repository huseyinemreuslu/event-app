import React, { useState, useEffect } from "react";
import { fetchEvents, fetchCities } from "../services/api";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [filter] = useState({
    archived: true,
  });
  const [setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(9);
  const [totalEvents, setTotalEvents] = useState(0);

  useEffect(() => {
    loadEvents();
    loadCities();
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
      <h3 className="mt-4">Geçmiş Etkinlik Listesi</h3>
      <Row>
        {events.map((event) => (
          <Col key={event.id} md={4} className="mb-4">
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
                        <Card.Text>{event.city}</Card.Text>
                      </Col>
                    </Row>
                    <div className="border-top my-3"></div>{" "}
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
