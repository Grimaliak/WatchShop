import React, { useEffect, useState } from 'react';
import NavBar from './ui/NavBar';
import Footer from './ui/Contact';
import { IconContext } from 'react-icons';
import { ToastContainer } from 'react-toastify';
import { Parallax, ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax';

const backgroundImage = 'background.jpeg';

export default function App({ children, user }) {
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
      <ParallaxProvider>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <Parallax speed={-50} style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
              <img
                src={backgroundImage}
                style={{ width: '100%', height: '100%', filter: 'blur(5px)' }}
              />
            </Parallax>
          </div>
          <div
            style={{
              position: 'relative',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <NavBar user={user} />
            <div style={{ flexGrow: 1 }}>{children}</div>
            <Footer />
          </div>
        </div>
      </ParallaxProvider>
      {/* <div
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
            <NavBar user={user} />
            <div style={{ flexGrow: 1 }}>{children}</div>
            <Footer />
          </Parallax>
        )}
      </div> */}
      <ToastContainer />
    </IconContext.Provider>
  );
}
