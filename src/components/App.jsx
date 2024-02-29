import React, { useEffect, useState } from 'react';
import NavBar from './ui/NavBar';
import Footer from './ui/Contact';
import { IconContext } from 'react-icons';
import { ToastContainer } from 'react-toastify';
import { Parallax } from 'react-parallax';

const backgroundImage = 'background.jpeg';

export default function App({ children }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <IconContext.Provider value={{ className: 'react-icon' }}>
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {imageLoaded && (
          <Parallax
            style={{
              flex: 1,
              display: 'flex',
            }}
            contentClassName="vano-parallax-inner"
            blur={5}
            bgImage={backgroundImage}
            strength={500}
            bgImageStyle={{
              backgroundSize: 'contain', // Оптимальный размер изображения для предотвращения потери качества
            }}
          >
            <NavBar />
            <div style={{ flexGrow: 1 }}>{children}</div>
            <Footer />
          </Parallax>
        )}
        <ToastContainer />
      </div>
    </IconContext.Provider>
  );
}
