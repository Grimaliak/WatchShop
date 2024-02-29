import React from 'react';
import { useTrail, animated } from 'react-spring';
import { Card, Button } from 'react-bootstrap';

const centerStyles = {
  height: '70vh',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
};

const fullWidth = {
  width: '100%',
};

const centeredContent = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

const transparentBackground = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
};

const heroText = "Indulge in timeless luxury with our exclusive collection of exquisite timepieces. Crafted with unparalleled precision and attention to detail, each watch exudes sophistication and elegance. Elevate your style with our curated selection of opulent watches, meticulously designed for true connoisseurs of fine craftsmanship. Discover the epitome of extravagance and make a statement with a timepiece that reflects your discerning taste.";

const Hero = () => {
  const config = { mass: 3, tension: 2000, friction: 200 };
  const trail = useTrail(heroText.length, {
    config,
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: 20 },
  });

  return (
    <div style={centerStyles}>
      <Card className="hero-content" style={{ ...fullWidth, ...transparentBackground }}>
        <Card.Body style={centeredContent}>
          <Card.Title style={{ fontFamily: 'Cinzel, serif' }}>
            {trail.map(({ x, opacity }, index) => (
              <animated.span key={index} style={{ opacity, transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`) }}>
                {heroText[index]}
              </animated.span>
            ))}
          </Card.Title>
          <Button variant="primary">Explore Collection</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Hero;
