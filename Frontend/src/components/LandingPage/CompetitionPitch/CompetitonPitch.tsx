import React from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import styles from "./CompetitionPitch.module.css";

const CompetitionPitch: React.FC = () => {
  return (
    <Container fluid className="bg-light">
      <h2 className={`${styles["rowdies-light"]} text-center py-5`}>
        <span className={`${styles["blue-text"]} text-center`}>Why we are </span>
        better than others?
      </h2>
      <p className={`${styles["saira-txt"]} text-center`}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.....
      </p>
      <Row className="justify-content-center py-5">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Col key={index} xs={12} md={4} className="mb-4">
            <Card className={`${styles["hover-effect"]} text-center`}>
              <Card.Body>
                <img src={`logo${index}.png`} alt={`Logo ${index}`} className="mb-3" />
                <Card.Title>Heading {index}</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec odio ipsum. Suspendisse cursus malesuada facilisis.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CompetitionPitch;

