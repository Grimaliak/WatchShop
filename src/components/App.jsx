import React from 'react';
import NavBar from './ui/NavBar';
import Footer from './ui/Contact';
import { IconContext } from 'react-icons';

export default function App({ children }) {
  return (
    <IconContext.Provider value={{ className: 'react-icon' }}>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </IconContext.Provider>
  );
}
