import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import CourseCard from "../CourseCard/CourseCard";
import { NavigateFunction, useNavigate } from "react-router";
import Styles from "../ExploreCourses/ExploreCourses.module.css";
import { course_type } from "../../constant";
import ChatBot from "../ChatBot/ChatBot";
import { useAppSelector } from "../../redux/hooks";
import { getEditableCoursesAPI } from "../../constant";

// EditCourse
function EditableCourse() {
  const [courses, setCourses] = useState<course_type[]>([]);
  const navigate: NavigateFunction = useNavigate();
  const { isAdmin, email, _id } = useAppSelector((state) => state.User);

  const [chatbotActive, setChatbotActive] = useState(false);
  const toggleChatbot = () => {
    setChatbotActive((prevChatbotActive) => !prevChatbotActive);
  };

  useEffect(() => {
    const fetchEditableCourses = async () => {
      try {
        const response = await axios.get(`${getEditableCoursesAPI}?adminId=${_id}`); // Append adminId as query parameter
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching editable courses", error);
      }
    };

    if (_id) {
      fetchEditableCourses();
    }
  }, [_id]); // Dependency on adminId ensures that courses are fetched when adminId changes or is set

  return (
    <Container className="text-center mt-5" style={{ minHeight: "50vh" }}>
      {courses.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center pt-5">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : (
        <>
          <h2 className="display-6 text-center fw-bold text-primary">Edit your Courses</h2>
          <Row xs={1} md={2} lg={3} className="my-5">
            {courses.map((course: course_type) => (
              <Col
                key={course._id}
                className={`my-4 ${Styles.coursecardcontainer} d-flex justify-content-center`}
              >
                <div
                  onClick={() => navigate(`/edit-course?id=${course?._id}`)}
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

export default EditableCourse;