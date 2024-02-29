import React, { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import styles from "./UserDashboard.module.css";
import StudentCard from "../StudentCard/StudentCard";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';



interface Course {
  _id: string;
  title: string;
  description: string;
  image_url: string;
}

interface UserDashboardProps {
  studentId: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ studentId }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/enrollment/courses",
          {
            user_id: studentId,
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchCourses();
  }, [studentId]);

  return (
    <div className={styles.userDashboardPage}>
      
      <div className={styles.heading}>
        <h2 className={styles.welcome}>Welcome to your Dashboard</h2>
        <h2 className={styles.userProfile}>User Profile</h2>
      </div>
      <StudentCard studentId={studentId} />

      <div className={styles.heading}>
        <h2 className={styles.userProfile}>Enrolled Courses</h2>
      </div>
      
      <Row xs={1} md={2} lg={3} className="mx-5">
        {courses.map((course: Course) => (
          <Col key={course._id} className="d-flex justify-content-center" >
            <CourseCard
            key={course._id}
              title={course.title}
              description={course.description}
              imageUrl={course.image_url}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserDashboard;
