
import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import AdminCourseCard from "../CourseCard/AdminCourseCard"; // Component to display each course card
import { NavigateFunction, useNavigate } from "react-router"; // Hook for navigation
import Styles from "../ExploreCourses/ExploreCourses.module.css"; // CSS module for styling
import { course_type } from "../../constant"; // TypeScript type for course
import ChatBot from "../ChatBot/ChatBot"; // Component for the ChatBot feature
import { useAppSelector } from "../../redux/hooks"; // Redux hook to access the store
import { getEditableCoursesAPI } from "../../constant"; // API endpoint constant

function AdminDashboardCourses() {
    const [courses, setCourses] = useState<course_type[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Added loading state
    const navigate: NavigateFunction = useNavigate();
    const { isAdmin, _id } = useAppSelector((state) => state.User);
    const [chatbotActive, setChatbotActive] = useState(false); // State to toggle the ChatBot display
    const toggleChatbot = () => {
      setChatbotActive((prevChatbotActive) => !prevChatbotActive); // Toggle function for ChatBot
    };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
    const fetchEditableCourses = async () => {
      setIsLoading(true); // Start loading before fetching data
      try {
        const response = await axios.get(`${getEditableCoursesAPI}?adminId=${_id}`);
        setCourses(response.data);
        setIsLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching editable courses", error);
        setIsLoading(false); // Stop loading if there is an error
      }
    };

    if (_id) {
      fetchEditableCourses();
    }
  }, [_id]);

  return (
    <Container className="text-center mt-5" style={{ minHeight: "50vh" }}>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center pt-5">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : courses.length > 0 ? (
        <>
          <h2 className="display-6 text-center fw-bold text-primary">Your Courses</h2>
          <Row xs={1} md={2} lg={3} className="my-5">
            {courses.map((course) => (
              <Col key={course._id} className={`my-4 ${Styles.coursecardcontainer} d-flex justify-content-center`}>
                <AdminCourseCard
                  title={course.title}
                  description={course.description}
                  imageUrl={course.image_url}
                  course_id={course._id}
                />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <h4 className="display-6 text-center fw-bold text-primary">No courses available</h4> // Display message when there are no courses
      )}
      {_id && <ChatBot toggleChatbot={() => setChatbotActive(!chatbotActive)} chatbotActive={chatbotActive} />}
    </Container>
  );
}

export default AdminDashboardCourses;
