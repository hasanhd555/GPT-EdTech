import { Card, Container, Row, Col, Button } from "react-bootstrap";
//import module.css file in the same folder
import styles from './hero.module.css'
const Hero: React.FC = () => {
  return (
    <Container fluid className={`${styles["custom-purple-blue-gradient"]} h-100`}> {/* Set background color inline */}
      <Row className="h-100">
        <Col xs={6} className="d-flex flex-column justify-content-between px-md-5 py-5"> {/* Left section */}
          <p className="text-semi-bold fs-6 text-white" style={{ fontFamily: 'Saira' }}> SUCCESSFUL COACHES ARE VISIONARIES </p>
          <h1 className="display-3 mb-4 text-white" style={{ lineHeight: '1.125' }}> Good coaching is good teaching & <br /> nothing else. </h1>
          <Button size="sm" className="px-md-5 align-self-start custom-small-btn btn-outline-light bg-transparent text-light"> View Courses </Button>
        </Col>
        <Col xs={6}> {/* Right section (can be empty or contain other content) */}
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;


