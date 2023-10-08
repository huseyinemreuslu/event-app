import { Container, Row, Col, Carousel, Card } from "react-bootstrap";

// EventDetailPage.js

import React, { useEffect, useState } from "react";

import { fetchEventById } from "../services/api";

function EventDetailPage({ match }) {
  const [event, setEvent] = useState(null);
  const eventId = match.params.eventId;

  const [groupedStands, setGroupedStands] = useState({});

  const groupStandsByGroup = (stands) => {
    const groupedStands = {};
    stands.forEach((stand) => {
      const group = stand.group;
      if (!groupedStands[group]) {
        groupedStands[group] = [];
      }
      groupedStands[group].push(stand);
    });
    return groupedStands;
  };

  useEffect(() => {
    // Belirli etkinliği API'den çekmek için fetchEvent işlevini kullan
    fetchEventById(eventId)
      .then((data) => {
        setEvent(data);
        const grouped = groupStandsByGroup(data.Stands);
        setGroupedStands(grouped);
      })
      .catch((error) => {
        console.error("Etkinlik alınamadı:", error);
      });
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Carousel>
            {event.Photos.length > 0 ? (
              event.Photos.map((photo) => (
                <Carousel.Item key={photo.id}>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:3000/api/uploads/${event.photo}`}
                    alt={photo.name}
                  />
                </Carousel.Item>
              ))
            ) : (
              <img
                className="d-block w-100"
                src={`http://localhost:3000/api/uploads/sample.jpg`}
                alt="sample"
              />
            )}
          </Carousel>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">{event.name}</Card.Title>
              <Card.Text className="event-description">
                {event.description}
              </Card.Text>
              <div className="event-details">
                <p>
                  <strong>Kategori:</strong> {event.Category?.name}
                </p>
                <p>
                  <strong>Adres:</strong> {event.address}
                </p>
                <p>
                  <strong>Konum:</strong> {event.location}
                </p>
                <p>
                  <strong>Başlangıç Tarihi:</strong>{" "}
                  {new Date(event.startedAt).toLocaleString()}
                </p>
                <p>
                  <strong>Bitiş Tarihi:</strong>{" "}
                  {new Date(event.finishedAt).toLocaleString()}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">Oturma Planı</Card.Title>
              {Object.keys(groupedStands).map((group) => (
                <div key={group}>
                  <Row>
                    <Col md={10}>
                      <h4>{group} Grubu</h4>
                    </Col>

                    <Col md={2}>
                      <h6 className="text-right text-danger mt-3">
                        ({groupedStands[group][0]?.price} TL)
                      </h6>
                    </Col>
                  </Row>

                  <table className="table">
                    <tbody>
                      {groupedStands[group].map((stand) => (
                        <button key={stand.id} className="m-4">
                          <td>{stand.seatNumber}</td>
                        </button>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EventDetailPage;
