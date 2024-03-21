import { Card, Container, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import styles from './hero.module.css'

const Hero: React.FC = () => {
  return (
    <Container fluid className={`${styles["custom-purple-blue-gradient"]} h-100`}>
      <Row className="h-100">
        <Col xs={6} className="d-flex flex-column justify-content-between px-md-5 py-5">
          <p className="text-semi-bold fs-6 text-white" style={{ fontFamily: 'Saira' }}>
            SUCCESSFUL COACHES ARE VISIONARIES
          </p>
          <h1 className="display-3 mb-4 text-white" style={{ lineHeight: '1.125' }}>
            Good coaching is good teaching & <br /> nothing else.
          </h1>
          <Button
            size="sm"
            variant="outline-light"
            className="px-md-5 align-self-start "
          >
            View Courses
          </Button>
          <div className="mt-4"> {/* Spacer div */}
            <Form className="d-flex align-items-center">
              <FormControl
                type="search"
                placeholder="Search for courses"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light" type="submit" className={`${styles["search-button"]}`}>
              <span className="bi bi-search ">
                Search
                </span>
              </Button>
            </Form>
          </div>
        </Col>
        <Col xs={6}>
          {/* Right section (can be empty or contain other content) */}
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;




