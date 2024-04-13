import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import CourseCard from "../CourseCard/CourseCard";
import { NavigateFunction, useNavigate } from "react-router";
import Styles from "./ExploreCourses.module.css";
import { course_type } from "../../constant";
import ChatBot from "../ChatBot/ChatBot";
import { useAppSelector } from "../../redux/hooks";
import { getAllCoursesAPI } from "../../constant";

interface ExploreCoursesProps {
  title: string;
}

function ExploreCourses({ title }: ExploreCoursesProps) {
  const [courses, setCourses] = useState<course_type[]>([]);
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
        setCourses(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <Container fluid className={`${Styles.background} text-center`} style={{ backgroundColor: "#D9ECFF",paddingBottom: "50px",paddingTop: "50px" ,overflowX:"hidden"}}>
      {courses.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center pt-5">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : (
        <>
        
          <h2 >{title}</h2>
          <Row xs={1} md={2} lg={3} className="my-5">
            {courses.map((course: course_type) => (
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
          {_id !== null ? (
            <ChatBot
              toggleChatbot={toggleChatbot}
              chatbotActive={chatbotActive}
            />
          ) : null}
        </>
      )}
    </Container>
  );
}

export default ExploreCourses;
