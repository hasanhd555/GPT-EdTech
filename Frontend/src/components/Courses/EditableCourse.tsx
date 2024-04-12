
// Importing necessary hooks and components from React, React Bootstrap, and Axios
import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import CourseCard from "../CourseCard/CourseCard"; // Component to display each course card
import { NavigateFunction, useNavigate } from "react-router"; // Hook for navigation
import Styles from "../ExploreCourses/ExploreCourses.module.css"; // CSS module for styling
import { course_type } from "../../constant"; // TypeScript type for course
import ChatBot from "../ChatBot/ChatBot"; // Component for the ChatBot feature
import { useAppSelector } from "../../redux/hooks"; // Redux hook to access the store
import { getEditableCoursesAPI } from "../../constant"; // API endpoint constant

// EditCourse
function EditableCourse() {
  const [courses, setCourses] = useState<course_type[]>([]); // State for storing courses
  const navigate: NavigateFunction = useNavigate(); // Hook for programmatic navigation
  const { isAdmin, email, _id } = useAppSelector((state) => state.User); // Destructuring user details from Redux store

  const [chatbotActive, setChatbotActive] = useState(false); // State to toggle the ChatBot display
  const toggleChatbot = () => {
    setChatbotActive((prevChatbotActive) => !prevChatbotActive); // Toggle function for ChatBot
  };

  // Effect hook to fetch editable courses from the backend on component mount
  useEffect(() => {
    // Redirect non-admin users to the homepage
    if (!isAdmin) {
      navigate("/");
    }
    const fetchEditableCourses = async () => {
      try {
        const response = await axios.get(`${getEditableCoursesAPI}?adminId=${_id}`); // Append adminId as query parameter
        setCourses(response.data); // Set fetched courses to state
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
         // Display spinners if no courses are available
        <div className="d-flex justify-content-center align-items-center pt-5">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : (
        // Render course analytics cards if courses are available
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
          {/* // Display ChatBot if user is authenticated */}
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