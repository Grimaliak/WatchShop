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
          <Nav.Link href="#">Watch list</Nav.Link>
          <Nav.Link href="#">Client contacts</Nav.Link>
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
