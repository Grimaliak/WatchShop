import React from 'react';
import { useSpring, animated } from 'react-spring';

const NotFoundPage = () => {
  const textAnimation = useSpring({
    to: { opacity: 1, fontSize: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    from: { opacity: 0, fontSize: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={textAnimation}>
      OLOLO TROLOLO
    </animated.div>
  );
};

export default NotFoundPage;
