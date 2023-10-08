// Navbar.js

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Örnek Etkinlik Uygulaması</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mt-4">
            <Nav.Link href="/">Etkinlikler</Nav.Link>
            <Nav.Link href="/places">Mekanlar</Nav.Link>
            <Nav.Link href="/archived">Geçmiş Etkinlikler</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
