import { Card, Container, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import styles from './hero.module.css';
import image from './hero_img.png'; // Import the image
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = `/search?query=${encodeURIComponent(searchValue)}`;

    navigate(url);
  };
  return (
    <Container fluid className={`${styles["custom-purple-blue-gradient"]} h-100 d-flex flex-column`}>
      <Row className="flex-grow-1">
        <Col xs={6} className="d-flex flex-column justify-content-between px-md-5 py-5">
          <p className="text-semi-bold fs-6 text-white" style={{ fontFamily: 'Saira' }}>
            SUCCESSFUL COACHES ARE VISIONARIES
          </p>
          <h1 className="display-3 mb-4 text-white" style={{ lineHeight: '1.125' }}>
            Good coaching is good teaching & <br /> nothing else.
          </h1>
          <Button
            size="sm"
            variant="outline-light"
            className="px-md-5 align-self-start"
            onClick={() => navigate('/explore-courses')}
          >
            View Courses
          </Button>
          <div className="mt-4"> {/* Spacer div */}
            <Form className="d-flex align-items-center"
            onSubmit={handleSubmit}>
              <FormControl
                type="search"
                placeholder="Search for courses"
                className="me-2"
                aria-label="Search"
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <Button variant="outline-light" type="submit" className={`${styles["search-button"]}`} >
                <span className="bi bi-search me-2">
                  Search
                </span>
              </Button>
            </Form>
          </div>
        </Col>
        <Col xs={6} className="d-flex align-items-end justify-content-end pe-5">
          {/* Image on the right */}
          <img src={image} alt="Image" className="img-fluid" style={{ maxWidth: '300px'}} />
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;




