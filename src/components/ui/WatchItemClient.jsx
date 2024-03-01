import React from 'react';
import { Card, Carousel, Stack } from 'react-bootstrap';

export default function WatchItemClient({ watch }) {
  return (
    <Card className="vano-watch-card">
      <Stack direction="horizontal" gap={2}>
        <Carousel className="vano-watch-carousel" interval={null}>
          {watch.Images.map((image) => (
            <Carousel.Item key={image.path}>
              <img
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                src={image.path}
                alt={image.path}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div
          style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <Card.Body style={{ textAlign: 'center', overflow: 'auto' }}>
            <Card.Title>{watch.name}</Card.Title>
            <Card.Text>{watch.description}</Card.Text>
          </Card.Body>
        </div>
      </Stack>
    </Card>
  );
}
