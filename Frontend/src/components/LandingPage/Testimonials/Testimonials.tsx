import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./Testimonials.module.css";
import { img1, img2, img3, stars } from "./TestimonialUrls";
const Testimonials: React.FC = () => {
  return (
    <Container fluid className={`${styles["background"]} text-center py-3 px-5`}>
      <h2 className={`${styles["green-text"]} py-5`}>What our Students Say About Us</h2>
      <Row className="justify-content-around">
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <div className="text-left">
                <img
                  src={img1}
                  alt="Student 1"
                  className="img-fluid rounded-circle"
                  style={{ width: "80px" }}
                />
                <Card.Title>Ronald Richards</Card.Title>
                <Card.Text>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </Card.Text>
                <img
                  src={stars}
                  alt="Bottom Left Image 1"
                  className="img-fluid"
                  style={{ width: "40px" }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <div className="text-left">
                <img
                  src={img2}
                  alt="Student 2"
                  className="img-fluid rounded-circle"
                  style={{ width: "80px" }}
                />
                <Card.Title>Wade Warren</Card.Title>
                <Card.Text>
                Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Reprehenderit in voluptate velit esse 
                </Card.Text>
                <img
                  src={stars}
                  alt="Bottom Left Image 2"
                  className="img-fluid"
                  style={{ width: "40px" }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card>
            <Card.Body>
              <div className="text-left">
                <img
                  src={img3}
                  alt="Student 3"
                  className="img-fluid rounded-circle"
                  style={{ width: "80px" }}
                />
                <Card.Title>Jacob Jones</Card.Title>
                <Card.Text>
                Esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit 
                </Card.Text>
                <img
                  src={stars}
                  alt="Bottom Left Image 3"
                  className="img-fluid"
                  style={{ width: "40px" }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Testimonials;
