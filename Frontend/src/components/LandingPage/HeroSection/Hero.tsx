import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import styles from "./hero.module.css"; 
import { useNavigate } from "react-router-dom"; 
import { useState } from "react"; 
import { Hero_Pic } from "./HeroUrls"; 

const Hero: React.FC = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState(""); 
  const [showTooltip, setShowTooltip] = useState(false); 

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
  
    if (searchValue.trim() !== "") { // If search input is empty, search should not be possible
      const url = `/search?query=${encodeURIComponent(searchValue)}`;
      try {
        await navigate(url); 
      } catch (error) {
        console.error("Navigation Error:", error); 
      }
    } else {
      setShowTooltip(true); // If search input is empty, show text asking to enter a search term
      setTimeout(() => setShowTooltip(false), 2000); 
    }
  };

  return (
    <Container
      fluid
      className={`${styles["custom-purple-blue-gradient"]} h-100 d-flex flex-column`}
    >
      <Row className="flex-grow-1">
        {/* Left side content */}
        <Col
          xs={6}
          className="d-flex flex-column justify-content-between px-md-5 py-5"
        >
          {/* Text elements */}
          <p className={`${styles["saira-txt"]} text-white `}>
            SUCCESSFUL COACHES ARE VISIONARIES
          </p>
          <h1 className={`${styles["rowdies-light"]}  text-white mb-4`}>
            Good <span className={`${styles["coaching-text"]} `}>coaching</span>{" "}
            is
            <br /> good teaching & <br /> nothing else.
          </h1>
          {/* Button to navigate to courses page */}
          <Button
            size="sm"
            variant="outline-light"
            className={` ${styles["button-txt"]} px-md-4 py-md-2 align-self-start`}
            onClick={() => navigate("/explore-courses")}
          >
            View Courses
          </Button>
          {/* Search form */}
          <div className="mt-4">
            <Form className={`d-flex  border-secondary`} onSubmit={handleSubmit}>
              {/* Search input field with tooltip */}
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-search">Please enter a search term</Tooltip>}
                show={showTooltip}
              >
                <FormControl
                  type="search"
                  placeholder="Search for courses"
                  className="border-secondary me-2 flex-grow-1"
                  aria-label="Search"
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </OverlayTrigger>
              <Button variant="outline-light" type="submit">
                <span className="bi bi-search me-1" />
                <span className={` ${styles["button-txt"]}  py-md-2 align-self-start`}>
                  Search
                </span>
              </Button>
            </Form>
          </div>
        </Col>
        {/* Right side image */}
        <Col xs={6} className="d-flex align-items-end justify-content-end pe-5">
          <img
            src={Hero_Pic}
            alt="Image"
            className={`${styles["custom-image"]} img-fluid`}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
