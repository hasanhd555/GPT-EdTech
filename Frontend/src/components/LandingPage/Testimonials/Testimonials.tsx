import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./Testimonials.module.css";
import { stars } from "./TestimonialUrls";
import { img1, img2, img3 } from "./TestimonialUrls";

const testimonialData = [
  {
    id: 1,
    name: "Ronald Richards",
    image: img1,
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    id: 2,
    name: "Wade Warren",
    image: img2,
    text: "Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Reprehenderit in voluptate velit esse"
  },
  {
    id: 3,
    name: "Jacob Jones",
    image: img3,
    text: "Esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit"
  }
];

const Testimonials: React.FC = () => {
  return (
    <Container fluid className={`${styles["background"]} text-center py-3 px-5`}>
      <h2 className={`${styles["green-text"]} py-5`}>What our Students Say About Us</h2>
      <Row className="justify-content-around">
        {testimonialData.map(testimonial => (
          <Col md={4} className="mb-3" key={testimonial.id}>
            <Card>
              <Card.Body>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="img-fluid rounded-circle mb-3"
                  style={{ width: "50px", float: "left", marginRight: "10px" }}
                />
                <div>
                  <Card.Title className="mb-3">{testimonial.name}</Card.Title>
                  <Card.Text style={{ padding: "0 10px" }}>{testimonial.text}</Card.Text>
                  <img
                    src={stars}
                    alt={`Bottom Left Image ${testimonial.id}`}
                    className="img-fluid"
                    style={{ width: "100px", float: "left" }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;
