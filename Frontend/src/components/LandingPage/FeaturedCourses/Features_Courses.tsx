import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import CourseCard from "../../CourseCard/CourseCard";
import { NavigateFunction, useNavigate } from "react-router";
import Styles from "./FeaturesCourses.module.css";

interface Course {
  _id: string;
  title: string;
  description: string;
  image_url: string;
}

function FeaturedCourses() {
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
    <Container fluid className="text-center mt-5" style={{ minHeight: "50vh" , backgroundColor: "#D9ECFF" }}>
      {courses.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center pt-5">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : (
        <>
          <h2>Featured Courses</h2>
          <p>lorem ipsum bing bong</p>
          <Row xs={1} md={2} lg={3} className="my-5">
            {courses.map((course: Course) => (
              <Col
                key={course._id}
                className={`my-4 ${Styles.coursecardcontainer}`}
              >
                <div
                  onClick={() => navigate(`/course-overview?id=${course?._id}`)}
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
        </>
      )}
    </Container>
  );
}

export default FeaturedCourses;
