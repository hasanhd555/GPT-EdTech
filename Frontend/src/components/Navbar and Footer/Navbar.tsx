import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Container,
  Button,
  InputGroup,
} from "react-bootstrap";
import Styles from "./Navbar.module.css";

function NavbarComp() {
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
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Explore</Nav.Link>
            <Nav.Link href="#link">About Us</Nav.Link>
            <Nav.Link href="#link">Contact Us</Nav.Link>
            <Nav.Link href="#link">Summarizer</Nav.Link>

            <Form className="d-flex px-2 border-secondary">
              <InputGroup>
                <Button
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
                />
              </InputGroup>
            </Form>
          </Nav>
          <Nav>
            <Button className="mx-2" variant="primary">
              Login
            </Button>
            <Button variant="outline-primary">Sign Up</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
