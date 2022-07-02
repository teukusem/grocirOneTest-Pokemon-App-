import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Icon from "../../assets/image/pikachu.png";
import { useNavigate } from "react-router-dom";

function NavbarPage() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex">
            <img
              alt="Icon Pokemon.png"
              src={Icon}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
            <span className="text-warning fw-bold ms-2 mt-1">Pokemon Go</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              className="fw-bold"
              onClick={() => {
                const listPokeElement = document.getElementById("listpoke");
                if (listPokeElement)
                  listPokeElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                navigate("/");
              }}
            >
              <span className="wrapText px-3">List Pokemon</span>
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/mypokemon")}
              className="fw-bold "
            >
              <span className="wrapText px-3">My Pokemon</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
