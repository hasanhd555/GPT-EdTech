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
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 2,
    name: "Wade Warren",
    image: img2,
    text: "Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    name: "Jacob Jones",
    image: img3,
    text: "Esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ",
  },
];

const Testimonials: React.FC = () => {
  // Get the maximum height of the text in the testimonial cards
  const maxTextHeight = Math.max(
    ...testimonialData.map(testimonial => testimonial.text.length)
  );

  return (
    <Container fluid className={`${styles["background"]} text-center py-3 px-5`}>
      <h2 className={`${styles["green-text"]} py-5`}>What our Students Say About Us</h2>
      <Row className="justify-content-around">
        {testimonialData.map((testimonial, index) => (
          <Col md={4} className="mb-3" key={testimonial.id}>
            <Card style={{ borderRadius: "30px", display: "flex", flexDirection: "column", height: "100%" }}>
              <Card.Body className="d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                <div>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  <div>
                    <Card.Title className="mb-3">{testimonial.name}</Card.Title>
                    <Card.Text style={{ padding: "0 10px", flex: "1" }}>{testimonial.text}</Card.Text>
                  </div>
                </div>
                <img
                  src={stars}
                  alt={`Bottom Left Image ${testimonial.id}`}
                  className="img-fluid"
                  style={{ width: "100px", float: "left", marginTop: "10px" ,marginBottom: "10px"}}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;
