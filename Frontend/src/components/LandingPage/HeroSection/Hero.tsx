import { Card, Container, Row, Col, Button, Form, FormControl,InputGroup } from "react-bootstrap";
import styles from './hero.module.css';

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Hero_Pic,Hero_testimonial,Green_stars} from './HeroUrls'





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
          <h1 className={ `${styles["rowdies-light"]} ${styles["heading_txt"]} text-white mb-4` }>
            Good <span className={`${styles["coaching-text"]} `}>coaching</span> is<br />  good teaching & <br /> nothing else.
          </h1>
          <Button
            size="sm"
            variant="outline-light"
            className={` ${styles["button-txt"]} px-md-4 py-md-2 align-self-start`}
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
            <span className="bi bi-search me-1"/>
            <span className={` ${styles["button-txt"]}  py-md-2 align-self-start`}>Search</span>
          </Button>
        </Form>
            
          </div>
        </Col>
        <Col xs={6} className="d-flex align-items-end justify-content-end pe-5">
          {/* Image on the right */}
          <img src={Hero_Pic} alt="Image"  className={`${styles["custom-image"]} img-fluid`} />
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;




