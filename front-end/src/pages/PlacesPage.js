import React, { useState, useEffect } from "react";
import { fetchPlaces, fetchCities } from "../services/api";
import { Container, Row, Col, Card, Pagination, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [filter] = useState({
    archived: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(9);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const history = useHistory();

  useEffect(() => {
    loadPlaces();
  }, [currentPage]); // Sayfa numarası değiştiğinde mekanları yeniden yükle

  const loadPlaces = async () => {
    try {
      console.log("LOADED");
      const placeData = await fetchPlaces({
        page: currentPage,
        pageSize: placesPerPage,
        filter,
      });
      setPlaces(placeData.rows);
      setTotalPlaces(placeData.count);
    } catch (error) {
      console.error("Mekanlar alınamadı:", error);
    }
  };

  const handleNavigate = (placeId) => {
    // Yönlendirme işlemi
    history.push(`/places/${placeId}`); // "/other-page" URL'sine yönlendirir
  };

  // Sayfa değiştirme işlevleri
  const paginate = async (pageNumber) => {
    setCurrentPage(pageNumber);
    await loadPlaces();
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPlaces / placesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <h3 className="mt-4">Mekan Listesi</h3>
      <Row>
        {places.map((place) => (
          <Col key={place.id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`http://localhost:3000/api/uploads/${place.id}.jpg`}
                alt={place.name}
                style={{ height: "200px" }}
              />
              <Card.Body>
                <Row>
                  <Col>
                    <Row>
                      <Col md={8}>
                        <Card.Title className="mb-3">{place.name}</Card.Title>
                      </Col>
                      <Col md={4}>{place.city}</Col>
                    </Row>
                    <div className="border-top my-3"></div>{" "}
                    <Card.Subtitle className="mt-1 mb-2">
                      <Col md={1}>
                        <Button
                          className="bg-dark"
                          onClick={() => handleNavigate(place.id)}
                        >
                          İncele
                        </Button>
                      </Col>
                    </Card.Subtitle>
                    <Card.Text>{place.description}</Card.Text>
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

export default PlacesPage;
