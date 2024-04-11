import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Container,
  Button,
  InputGroup,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { clearUserData } from "../../redux/slices/User_Slice";
import { useDispatch } from "react-redux";
import Leaderboard from "../LeaderBoard/LeaderBoard";

function NavbarComp() {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { isAdmin, email, _id } = useAppSelector((state) => state.User);
  const [showTooltip, setShowTooltip] = useState(false); // State to control tooltip visibility


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value); // Update the searchValue
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchValue.trim() !== '') {
      const url = `/search?query=${encodeURIComponent(searchValue)}`;
      navigate(url);
    } else {
      setShowTooltip(true); // Show tooltip if search value is empty
      setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 2 seconds
    }
  };

  const handleClearUserData = () => {
    dispatch(clearUserData());
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-white shadow">
      <Container fluid className="px-5" style={{ fontWeight: "500" }}>
        <Navbar.Brand>
          <img
            src="/IntelliLearn Logo.svg"
            width="40"
            height="50"
            className="d-inline-block align-top"
            alt="IntelliLearn logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/explore-courses");
              }}
            >
              Explore
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about-us");
              }}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/contact-us");
              }}
            >
              Contact Us
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/summarizer");
              }}
            >
              Summarizer
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/leaderboard");
              }}
            >
              Leaderboard
            </Nav.Link>
            <Form
              className="d-flex px-2 border-secondary"
              onSubmit={handleSubmit}
            >
              <InputGroup>
                <Button
                  type="submit"
                  variant="outline-secondary"
                  className={`${Styles.customhighlight}`}
                >
                  <span className="bi bi-search"></span>
                </Button>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-search">
                      Please enter a search term
                    </Tooltip>
                  }
                  show={showTooltip}
                >
                  <FormControl
                    type="search"
                    placeholder="Search a Course"
                    className={`border-secondary ${Styles.customhighlight}`}
                    aria-label="Search"
                    value={searchValue}
                    onChange={handleChange}
                  />
                </OverlayTrigger>
              </InputGroup>
            </Form>
          </Nav>
          <Nav>
            {email === null ? (
              <>
                <Button
                  className="mx-2"
                  variant="primary"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="mx-2 px-5"
                  variant="primary"
                  onClick={handleClearUserData}
                >
                  LogOut
                </Button>
                <Button
                  type="submit"
                  variant="outline-primary"
                  onClick={() => {
                    isAdmin
                      ? navigate("/dash-admin")
                      : navigate("/dash-student");
                  }}
                >
                  <span className="bi bi-person-circle"></span>
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
