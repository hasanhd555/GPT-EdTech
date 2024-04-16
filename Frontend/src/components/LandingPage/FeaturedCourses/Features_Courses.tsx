import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import CourseCard from "../../CourseCard/CourseCard";
import { NavigateFunction, useNavigate } from "react-router";
import Styles from "./FeaturesCourses.module.css";
import ChatBot from "../../ChatBot/ChatBot";
import { useAppSelector } from "../../../redux/hooks";
import { getAllCoursesAPI } from "../../../constant";
import {Course} from "../../../constant"

// Define the Course interface


function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate: NavigateFunction = useNavigate();
  const { isAdmin, email, _id } = useAppSelector((state) => state.User);
  const [chatbotActive, setChatbotActive] = useState(false);


  const toggleChatbot = () => {
    setChatbotActive((prevChatbotActive) => !prevChatbotActive);
  };

  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.post(getAllCoursesAPI);
        // Slice the response to get only the first 6 courses
        setCourses((response?.data).slice(0, 6));
        console.log(response?.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <Container fluid className="text-center" 
    style={{  backgroundColor: "#D9ECFF",paddingBottom: "50px",paddingTop: "50px" ,overflowX:"hidden"}}>
      {/* Display a spinner while courses are being loaded */}
      {courses.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center pt-5">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : (
        <>
          {/* Display heading and description */}
          <h2 className={`${Styles["rowdies-light"]} `}>
            Featured&nbsp;  
            <span className={`${Styles["blue-text"]} `}>
              Courses
            </span>
          </h2>
          <p className={`${Styles["saira-txt"]} `}>
            Unlock Your Potential with Our Courses!
          </p>
          {/* Display course cards */}
          <Row xs={1} md={2} lg={3} className="my-5">
            {courses.map((course: Course) => (
              <Col
                key={course._id}
                className={`my-4 ${Styles.coursecardcontainer} d-flex justify-content-center`}
              >
                <div
                  onClick={() => navigate(`/course-overview?id=${course?._id}`)}
                  style={{ width: "90%" }}
                >
                  <CourseCard
                    key={course._id}
                    title={course.title}
                    description={course.description}
                    imageUrl={course.image_url}
                  />
                </div>
              </Col>
            ))}
          </Row>
          {/* Display the chatbot if the user is logged in */}
          {_id !== null ? (
            <ChatBot
              toggleChatbot={toggleChatbot}
              chatbotActive={chatbotActive}
            />
          ) : null}
          {/* Button to explore more courses */}
          <Button className={`${Styles["button"]} px-md-4 py-md-2 align-self-start ${Styles["saira-txt"]}`}
          onClick={()=>{navigate("/explore-courses")}}>
            Explore Courses
          </Button>
        </>
      )}
    </Container>
  );
}

export default FeaturedCourses;
