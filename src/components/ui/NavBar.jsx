import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar({ user }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">WatchShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Якорь 1</Nav.Link>
          <Nav.Link href="#features">Якорь 2</Nav.Link>
          <Nav.Link href="#pricing">Якорь 3</Nav.Link>
        </Nav>
        {user && (
          <Nav.Link href="/admin-logout">Logout</Nav.Link>
        )}
        {!user && (
          <Nav.Link href="/admin-login">Login as admin</Nav.Link>
        )}
      </Container>
    </Navbar>
  );
}
