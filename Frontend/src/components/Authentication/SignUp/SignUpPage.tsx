import React from "react";
import SignUpForm from "./SignUpForm";
import TestimonialCarousel from "./TestimonialCarousel";
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
