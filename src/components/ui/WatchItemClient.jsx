import React from 'react';
import { Card, Carousel } from 'react-bootstrap';

export default function WatchItemClient({ watch }) {
  return (
    <Card
      style={{
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        background: 'rgba(255, 255, 255, 0.3)',
      }}
    >
      <Carousel
        style={{
          width: '30%',
          margin: 'auto',
          height: '200px',
          maxHeight: '200px',
          overflow: 'hidden',
        }}
      >
        <Carousel.Item>
          <img
            style={{ objectFit: 'contain', width: '100%', height: '200px' }}
            src="LZar1lCopeaQEHd6eOH3UZ1VcoVqJ6RR12gmRD4w.jpeg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ objectFit: 'contain', width: '100%', height: '200px' }}
            src="tQfhcNWhMXbTxSr3v2tLYaxNMemFBTnafqUtoIqO.jpeg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ objectFit: 'contain', width: '100%', height: '200px' }}
            src="uPds08shefL3PrFuVTdzUu8EbOYpMEHupAOjkvAO.jpeg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Card.Body style={{ textAlign: 'center', overflow: 'auto' }}>
          <Card.Title>Rolex</Card.Title>
          <Card.Text>Блатные часы для блатного дяди</Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
}
