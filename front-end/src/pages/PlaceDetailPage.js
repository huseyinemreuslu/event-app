import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParams hook'unu kullanarak URL'den placeId'yi alacağız
import { Container, Card, ListGroup, Row, Col, Button } from "react-bootstrap"; // React-Bootstrap bileşenlerini ekleyin
import { fetchPlaceById } from "../services/api"; // API servisine yerleştirilecek yol
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PlaceDetailPage() {
  const { placeId } = useParams(); // URL'den placeId'yi alın
  const [place, setPlace] = useState(null);
  const history = useHistory();
  useEffect(() => {
    // Belirli bir mekanın bilgilerini API'den çekmek için bir fonksiyon kullanabilirsiniz
    fetchPlaceById(placeId)
      .then((data) => {
        setPlace(data);
      })
      .catch((error) => {
        console.error("Mekan bilgileri alınamadı:", error);
      });
  }, [placeId]);

  if (!place) {
    return <div>Loading...</div>;
  }

  const handleNavigate = (eventId) => {
    // Yönlendirme işlemi
    history.push(`/events/${eventId}`); // "/other-page" URL'sine yönlendirir
  };

  return (
    <Container>
      <h3 className="mt-4">{place.name} Mekanı</h3>
      <Card>
        <ListGroup className="list-group-flush">
          <ListGroup.Item variant="info">Etkinlikler</ListGroup.Item>
          {place.Events.map((event) => (
            <ListGroup.Item key={event.id}>
              <Col>
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
                            <Card.Title className="mb-3">
                              {event.name}
                            </Card.Title>
                          </Col>
                        </Row>
                        <Col md={12}>{event.description}</Col>
                        <div className="border-top my-3"></div>{" "}
                        <Card.Subtitle className="mt-1 mb-2">
                          <Col md={1}>
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
                          </Col>
                        </Card.Subtitle>
                        <Card.Text>{place.description}</Card.Text>
                        <div className="border-top my-3"></div>{" "}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default PlaceDetailPage;
