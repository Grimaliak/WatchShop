import React from 'react';
import NavBar from './ui/NavBar';
import Footer from './ui/Contact';
import { IconContext } from 'react-icons';
import { ToastContainer } from 'react-toastify';

export default function App({ children }) {
  return (
    <IconContext.Provider value={{ className: 'react-icon' }}>
      <NavBar />
      <div>{children}</div>
      <Footer />
      <ToastContainer />
    </IconContext.Provider>
  );
}
