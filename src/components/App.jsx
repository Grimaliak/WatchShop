import React, { useEffect, useState } from 'react';
import NavBar from './ui/NavBar';
import Footer from './ui/Contact';
import { Parallax } from 'react-parallax';

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const contentStyle = {
  flex: 1,
};

const backgroundImage = 'background.jpeg';

const parallaxImageStyle = {
  backgroundSize: 'contain', // Оптимальный размер изображения для предотвращения потери качества
};

export default function App({ children }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = backgroundImage;
  }, []);

  return (
    <div style={containerStyle}>
      <NavBar />
      <div style={contentStyle}>
        {imageLoaded && (
          <Parallax bgImage={backgroundImage} strength={300} bgImageStyle={parallaxImageStyle}>
            <div>{children}</div>
          </Parallax>
        )}
      </div>
      <Footer />
    </div>
  );
}
