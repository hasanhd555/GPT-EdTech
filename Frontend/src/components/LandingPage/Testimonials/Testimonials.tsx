import React from "react";
import { Card, Container } from "react-bootstrap";
import styles from "./Testimonials.module.css";

const Testimonials: React.FC = () => {
  return (
    <Container fluid className={`${styles["background"]} text-center`}>
      <h2 className={`${styles["green-text"]} py-5`}>What our Students Say About Us</h2>
      <div className="d-flex justify-content-around">
        <Card className="rounded">
          <Card.Body>
            <div className="text-left">
              <img
                src="image_url_1"
                alt="Student 1"
                className="img-fluid rounded-circle"
                style={{ width: "80px" }}
              />
              <Card.Title>Name 1</Card.Title>
              <Card.Text>
                Text of testimonial goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
              <img
                src="bottom_left_image_url_1"
                alt="Bottom Left Image 1"
                className="img-fluid"
                style={{ width: "40px" }}
              />
            </div>
          </Card.Body>
        </Card>

        {/* Repeat the same structure for the remaining two cards */}
        {/* Card 2 */}
        <Card className="rounded">
          <Card.Body>
            <div className="text-left">
              <img
                src="image_url_1"
                alt="Student 1"
                className="img-fluid rounded-circle"
                style={{ width: "80px" }}
              />
              <Card.Title>Name 1</Card.Title>
              <Card.Text>
                Text of testimonial goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
              <img
                src="bottom_left_image_url_1"
                alt="Bottom Left Image 1"
                className="img-fluid"
                style={{ width: "40px" }}
              />
            </div>
          </Card.Body>
        </Card>
        {/* Card 3 */}
        <Card className="rounded">
          <Card.Body>
            <div className="text-left">
              <img
                src="image_url_1"
                alt="Student 1"
                className="img-fluid rounded-circle"
                style={{ width: "80px" }}
              />
              <Card.Title>Name 1</Card.Title>
              <Card.Text>
                Text of testimonial goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Card.Text>
              <img
                src="bottom_left_image_url_1"
                alt="Bottom Left Image 1"
                className="img-fluid"
                style={{ width: "40px" }}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Testimonials;
