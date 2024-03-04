import React, { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import StudentCard from "../StudentCard/StudentCard";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks";
import Button from "react-bootstrap/Button";
import "./AdminDashboard.scss";
import { NavigateFunction, useNavigate } from "react-router";

interface Course {
  _id: string;
  title: string;
  description: string;
  image_url: string;
}

const AdminDashboard = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const navigate: NavigateFunction = useNavigate();
  
    useEffect(() => {
      const fetchResults = async () => {
        try {
          const response = await axios.post("http://localhost:5001/api/course");
          setCourses(response?.data);
          console.log(response?.data);
        } catch (error) {
          console.error("Error fetching courses", error);
        }
      };
  
      fetchResults();
    }, []);

  return (
    <div className="">
      <div>
        <h2 className="display-5 text-center fw-bold">
          Welcome to your Dashboard
        </h2>
      </div>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <Button className="width-5em mb-2 me-2" variant="primary" size="lg">
          Add a New Course
        </Button>
      </div>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <Button className="width-5em mb-2 me-2" variant="primary" size="lg">
          Edit a Course
        </Button>
      </div>

      <div>
        <h2 className="display-6 text-center fw-bold">All Courses</h2>
      </div>

      <Row xs={1} md={2} lg={3} className="mx-5">
        {courses.map((course: Course) => (
          <Col key={course._id} className="d-flex justify-content-center">
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

export default AdminDashboard;
