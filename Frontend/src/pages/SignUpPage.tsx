import React from "react";
import SignUpForm from "../components/Authentication/SignUp/SignUpForm";
import TestimonialCarousel from "../components/Authentication/SignUp/TestimonialCarousel";
import { Row, Col, Container } from "react-bootstrap";

const SignUpPage = () => {
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
            <SignUpForm />
          </Col>
        </Row>
      </Container>
      {/* <div>Footer</div> Will insert later */}
    </>
  );
};

export default SignUpPage;
