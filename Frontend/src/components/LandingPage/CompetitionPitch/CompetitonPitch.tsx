import React from "react";
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import styles from "./CompetitionPitch.module.css";
import { img1, img2, img3, img4, img5, img6 } from "./CompUrls";

interface carddata{
  url: string;
  heading: string;
  text: string;
}

let cardData: carddata[] = [
  {
    url: img1,
    heading: "Digital Platform",
    text: "Our advanced digital platform offers intuitive navigation, interactive features, and personalized learning experiences."
  },
  {
    url: img2,
    heading: "Optimal Ideation",
    text: "Our platform fosters optimal ideation through collaborative tools, diverse resources, and innovative learning environments."
  },
  {
    url: img3,
    heading: "Favorable Setting",
    text: "Discover a welcoming environment for learning, equipped with intuitive tools and abundant resources."
  },
  {
    url: img4,
    heading: "Effective Interaction",
    text:"Engage in dynamic learning experiences with interactive tools fostering collaboration and knowledge exchange."
  },
  {
    url: img5,
    heading: "Flexible Time",
    text: "Seize control of your learning journey with the freedom to study at your own pace."
  },
  {
    url: img6,
    heading: "Reliable",
    text: "Count on consistent performance and dependable resources for a reliable learning experience."
  }

]

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
      <Row className="justify-content-center py-5">
        {cardData.map((index, idx) => (
          <Col key={idx} xs={12} md={4} className="mb-4">
            <Card className={`${styles["hover-effect"]} text-center`} style={{ height: "100%" }}>
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



