import React from 'react';
import { Card, Button } from 'react-bootstrap';

const centerStyles = {
  height: '100vh', // Центрирование по вертикали на всю высоту окна
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
};

const fullWidth = {
  width: '100%', // Ширина карточки на всю ширину экрана
};

const centeredContent = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

function Hero() {
  return (
    <div style={centerStyles}>
      <Card className="hero-content" style={fullWidth}>
        <Card.Body style={centeredContent}>
          <Card.Title>Знаковые часы для вашего стиля</Card.Title>
          <Card.Text>
            Изысканные модели часов для истинных ценителей времени.
          </Card.Text>
          <Button variant="primary">Посмотреть коллекцию</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Hero;
