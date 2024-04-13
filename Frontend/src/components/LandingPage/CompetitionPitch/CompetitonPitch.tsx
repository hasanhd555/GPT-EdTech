import React from "react";
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import styles from "./CompetitionPitch.module.css";
import cardData from "./CompetitionData";


const CompetitionPitch: React.FC = () => {
  return (
    
    <Container fluid className="bg-light pd-5 px-5">
      <h2 className={`${styles["rowdies-light"]} text-center py-5`}>
        <span className={`${styles["blue-text"]} text-center`}>Why we are </span>
        better than others?
      </h2>
      <p className={`${styles["saira-txt"]} text-center`}>
        Dive into a unique learning experience with our expert-curated courses. Gain practical skills, connect with a supportive community, and unlock endless opportunities. Join us now and discover the difference!
      </p>
      {/* Row to display cards containing information */}
      <Row className="justify-content-center py-5">
        {/* Mapping through cardData to render individual cards */}
        {cardData.map((index, idx) => (
          <Col key={idx} xs={12} md={4} className="mb-4">
            {/* Card component with hover effect */}
            <Card className={`${styles["hover-effect"]} text-center`} style={{ height: "100%" }}>
              {/* Card body containing image, title, and text */}
              <Card.Body>
               
                <img src={index.url} alt={``} className="mb-3" />
                
                <Card.Title>{index.heading}</Card.Title>
             
                <Card.Text>{index.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CompetitionPitch;
