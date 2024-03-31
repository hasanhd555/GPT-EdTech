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
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec odio ipsum. Suspendisse cursus malesuada facilisis."
  },
  {
    url: img2,
    heading: "Optimal Ideation",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec odio ipsum. Suspendisse cursus malesuada facilisis."
  },
  {
    url: img3,
    heading: "Favorable Setting",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec odio ipsum. Suspendisse cursus malesuada facilisis."
  },
  {
    url: img4,
    heading: "Effective Interaction",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec odio ipsum. Suspendisse cursus malesuada facilisis."
  },
  {
    url: img5,
    heading: "Flexible Time",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec odio ipsum. Suspendisse cursus malesuada facilisis."
  },
  {
    url: img6,
    heading: "Reliable",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec odio ipsum. Suspendisse cursus malesuada facilisis."
  }

]

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
        {cardData.map((index) => (
          <Col  xs={12} md={4} className="mb-4">
            <Card className={`${styles["hover-effect"]} text-center`}>
              <Card.Body>
                <img src={index["url"]} alt={``} className="mb-3" />
                {/* Assuming img1, img2, etc. are the correct variables containing image URLs */}
                <Card.Title>{index["heading"]} </Card.Title>
                <Card.Text>
                  {index["text"]}
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


