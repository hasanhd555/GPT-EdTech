import { Card, Container, Row, Col, Button, Form, FormControl,InputGroup } from "react-bootstrap";
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
          <p className={`${styles["saira-txt"]} text-white `}>
            SUCCESSFUL COACHES ARE VISIONARIES
          </p>
          <h1 className={ `${styles["rowdies-light"]} text-white` }>
            Good <span className={`${styles["coaching-text"]} `}>coaching</span> is good teaching & <br /> nothing else.
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
          
          <Form className={`d-flex  border-secondary`} onSubmit={handleSubmit}>
          <FormControl
            type="search"
            placeholder="Search for courses"
            className="border-secondary me-2 flex-grow-1" // Removed unnecessary backticks and fixed class name
            aria-label="Search"
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <Button variant="outline-light" type="submit">
            <span className="bi bi-search me-1"></span>
            <span>Search</span>
          </Button>
        </Form>
            
          </div>
        </Col>
        <Col xs={6} className="d-flex align-items-end justify-content-end pe-5">
          {/* Image on the right */}
          <img src={image} alt="Image"  className={`${styles["custom-image"]} img-fluid`} />
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;




