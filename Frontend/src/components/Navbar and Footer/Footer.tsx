import { Container, Row, Col } from "react-bootstrap";
import Styles from "./Navbar.module.css";

function Footer() {
  return (
    <footer className={`bg-white text-dark py-5 ${Styles.footer}`}>
      <Container fluid>
        <Row>
          <Col md={6} className="px-5 ">
            <img
              src="/IntelliLearn Logo.svg"
              width="40"
              height="50"
              className="d-inline-block align-top mb-3"
              alt="IntelliLearn logo"
            />
            <span className="d-flex align-items-center ms-2 ">
              <i className="bi bi-envelope-fill px-2"></i>
              <p className="m-0">Hello@IntelliLearn.com</p>
            </span>
            <span className="d-flex align-items-center ms-2 ">
              <i className="bi bi-telephone-fill px-2"></i>
              <p className="m-0">+91 91813 23 2309</p>
            </span>
            <span className="d-flex align-items-center ms-2">
              <i className="bi bi-geo-alt-fill px-2"></i>
              <p className="m-0">Lahore University of Management Sciences</p>
            </span>
          </Col>
          <Col md={2}>
            <h5 className="mb-3">Pages</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Explore
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Summarizer
                </a>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            <h5 className="mb-3">Get in Touch</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  About Us
                </a>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            <h5 className="mb-3">Social Profiles</h5>
            <span className="d-flex align-items-center ms-2">
              <i className="bi bi-facebook px-2"></i>
              <i className="bi bi-twitter-x px-2"></i>
              <i className="bi bi-linkedin px-2"></i>
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
