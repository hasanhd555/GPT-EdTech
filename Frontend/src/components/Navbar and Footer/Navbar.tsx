import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Container,
  Button,
  InputGroup,
} from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { useState } from "react";

function NavbarComp() {
  const navigate: NavigateFunction = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value); // Update the searchValue
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = `/search?query=${encodeURIComponent(searchValue)}`;

    navigate(url);
  };

  return (
    <Navbar expand="lg" className="bg-body-white shadow">
      <Container fluid className="px-5" style={{ fontWeight: "500" }}>
        <Navbar.Brand>
          <img
            src="/IntelliLearn Logo.svg"
            width="40"
            height="50"
            className="d-inline-block align-top"
            alt="IntelliLearn logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/explore-courses");
              }}
            >
              Explore
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about-us");
              }}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/contact-us");
              }}
            >
              Contact Us
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/summarize");
              }}
            >
              Summarizer
            </Nav.Link>

            <Form
              className="d-flex px-2 border-secondary"
              onSubmit={handleSubmit}
            >
              <InputGroup>
                <Button
                  type="submit"
                  variant="outline-secondary"
                  className={` ${Styles.customhighlight}`}
                >
                  <span className="bi bi-search "></span>
                </Button>
                <FormControl
                  type="search"
                  placeholder="Search a Course"
                  className={`border-secondary ${Styles.customhighlight}`}
                  aria-label="Search"
                  value={searchValue}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form>
          </Nav>
          <Nav>
            <Button
              className="mx-2"
              variant="primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
