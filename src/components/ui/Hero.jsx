import React from 'react';
import { useTrail, animated } from 'react-spring';
import { Card, Button } from 'react-bootstrap';

const heroText = 'Indulge in timeless luxur';

const Hero = () => {
  const config = { mass: 3, tension: 2000, friction: 200 };
  const trail = useTrail(heroText.length, {
    config,
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: 20 },
  });

  return (
    <Card className="vano-hero-content">
      <Card.Body>
        <Card.Title style={{ fontFamily: 'Cinzel, serif' }}>
          {trail.map(({ x, opacity }, index) => (
            <animated.span
              key={index}
              style={{ opacity, transform: x.interpolate((x) => `translate3d(${x}px, 0, 0)`) }}
            >
              {heroText[index]}
            </animated.span>
          ))}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Hero;
