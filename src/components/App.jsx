import React from 'react';
import NavBar from './ui/NavBar';
import Footer from './ui/Contact';

export default function App({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
