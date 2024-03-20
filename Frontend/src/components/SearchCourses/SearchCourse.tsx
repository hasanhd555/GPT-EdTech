import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router";
import axios from "axios";
import CourseCard from "../CourseCard/CourseCard";
import Styles from "./SearchCourse.module.css";
import { SearchCourseAPI } from "../../constant";

interface Course {
  _id: string;
  title: string;
  description: string;
  image_url: string;
}

function SearchCourse() {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("query");

    if (queryParam) {
      setQuery(queryParam);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.post(SearchCourseAPI, { name: query });
        setCourses(response?.data);
        setLoading(false);
        // console.log("response obj =", response?.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    // console.log("fetching Results for ", query);
    if (query !== "") {
      fetchResults();
    }
  }, [query]);

  return (
    <Container className="text-center mt-5" style={{ minHeight: "50vh" }}>
      {courses.length === 0 ? (
        <>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center pt-5">
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="primary" />
            </div>
          ) : (
            <h2>
              It looks like there aren't many great matches for your search.
              <br /> Try Again
            </h2>
          )}
        </>
      ) : (
        <>
          <h2>
            Search Results for:<br></br> {query}
          </h2>
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

export default SearchCourse;
