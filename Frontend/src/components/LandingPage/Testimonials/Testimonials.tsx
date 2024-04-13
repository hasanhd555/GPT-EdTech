import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./Testimonials.module.css"; // Importing CSS styles
import { stars } from "./TestimonialUrls"; // Importing image URL
import testimonialData from "./TestimonialsData"; // Importing testimonial data

const Testimonials: React.FC = () => {

  return (
    // Container for testimonials section
    <Container fluid className={`${styles["background"]} text-center py-3 px-5`}>
      
      <h2 className={`${styles["green-text"]} py-5`}>What our Students Say About Us</h2>
      {/* Row for testimonial cards */}
      <Row className="justify-content-around">
        {/* Mapping through testimonial data and creating cards */}
        {testimonialData.map((testimonial, index) => (
          <Col md={4} className="mb-3" key={testimonial.id}>
            
            <Card className={`${styles["hover-effect"]}`} style={{ borderRadius: "30px", display: "flex", flexDirection: "column", height: "100%" }}>
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

