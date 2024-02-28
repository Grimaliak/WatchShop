import React from 'react';
import { Carousel, Card, Row, Col } from 'react-bootstrap';

export default function WatchItemClient({ watch }) {
  return (
    <Row>
      <Col sm={6}>
        <Carousel style={{ maxHeight: '100px', maxWidth: '400px' }}>
          <Carousel.Item>
            <img
              style={{
                maxHeight: '200px',
                maxWidth: '200px',
                objectFit: 'contain',
                margin: 'auto',
              }}
              className="d-block w-100 h-auto"
              src="LZar1lCopeaQEHd6eOH3UZ1VcoVqJ6RR12gmRD4w.jpeg"
              alt="Первый слайд"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{
                maxHeight: '200px',
                maxWidth: '200px',
                objectFit: 'contain',
                margin: 'auto',
              }}
              className="d-block w-100 h-auto"
              src="tQfhcNWhMXbTxSr3v2tLYaxNMemFBTnafqUtoIqO.jpeg"
              alt="Второй слайд"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{
                maxHeight: '200px',
                maxWidth: '200px',
                objectFit: 'contain',
                margin: 'auto',
              }}
              className="d-block w-100 h-auto"
              src="uPds08shefL3PrFuVTdzUu8EbOYpMEHupAOjkvAO.jpeg"
              alt="Третий слайд"
            />
          </Carousel.Item>
        </Carousel>
      </Col>
      <Col sm={6} className="d-flex align-items-center">
        <Card style={{ width: '20rem', height: '10rem', objectFit: 'contain' }}>
          <Card.Body>
            <Card.Title>Rolex</Card.Title>
            <Card.Text>Блатные часы для блатного дяди</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
