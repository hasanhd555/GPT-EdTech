import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks";
import CourseCard from "../CourseCard/CourseCard";
import StudentCard from "../StudentCard/StudentCard";
import styles from "./UserDashboard.module.css";
import { FetchCourseAPI, course_type } from "../../constant"; // Import constants and course_type interface

const UserDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<course_type[]>([]); // Using course_type from constants
  const { isAdmin, email, _id } = useAppSelector(state => state.User);

  useEffect(() => {
    // Redirect if no user ID or if the user is an admin
    if (_id === null || isAdmin) {
      navigate("/");
    }
    
    // Function to fetch courses from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.post(FetchCourseAPI, { user_id: _id });
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchCourses(); // Execute the function on component mount
  }, [_id]);

  return (
    <div className={styles.userDashboardPage}>
      <div className={`${styles["custom-purple-blue-gradient"]} `} style={{paddingBottom:"100px",paddingTop:"30px"}}>
      <div className={styles.heading}>
        <h1 className={styles.welcome}>Student <span style={{ color: "#4BE5CA" }}>Dashboard</span></h1>
        <h2 className={styles.userProfile}><span style={{ color: "#ffffffff" }}>User Profile</span></h2>
      </div>
      <StudentCard studentId={_id} />
      </div>
      <div style={{backgroundColor: "#D9ECFF",paddingBottom:"100px",paddingTop:"30px"}}>
      <div className={styles.heading}>
        <h2 className={styles.userProfile}>Enrolled Courses</h2>
      </div>

      <Row xs={1} md={2} lg={3} className="mx-5" data-testid="enrolled-courses">
        {courses.map((course) => (
          <Col key={course._id} className={`d-flex justify-content-center my-4 ${styles.coursecardcontainer}`}>
            <div onClick={() => navigate(`/course-content?id=${course._id}`)} style={{ width: "80%" }}>
              <CourseCard key={course._id} title={course.title} description={course.description} imageUrl={course.image_url} />
            </div>
          </Col>
        ))}
      </Row>
      </div>
    </div>
  );
};

export default UserDashboard;
