import React from "react";
import LoginForm from "../components/Authentication/Login/LoginForm";
import TestimonialCarousel from "../components/Authentication/SignUp/TestimonialCarousel";
import { Container, Row, Col } from "react-bootstrap";

const LoginPage = () => {
  return (
    <>
      {/* <div>Navbar</div> Will insert later */}
      <Container fluid>
        <Row className="d-flex align-items-center">
          {" "}
          <Col>
            <TestimonialCarousel />
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <LoginForm />
          </Col>
        </Row>
      </Container>
      {/* <div>Footer</div> Will insert later */}
    </>
  );
};

export default LoginPage;
