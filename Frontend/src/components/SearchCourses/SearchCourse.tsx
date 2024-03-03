import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import CourseCard from "../CourseCard/CourseCard";

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
        const response = await axios.post(
          "http://localhost:5001/api/course/search",
          { name: query }
        );
        setCourses(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <Container className="text-center mt-5" style={{ minHeight: "50vh" }}>
      {courses.length === 0 ? (
        <h2>
          It looks like there aren't many great matches for your search.
          <br /> Try Again
        </h2>
      ) : (
        <>
          <h2>
            Search Results for:<br></br> {query}
          </h2>
          <Row xs={1} md={2} lg={3} className="my-5">
            {courses.map((course: Course) => (
              <Col key={course._id} className="">
                <CourseCard
                  key={course._id}
                  title={course.title}
                  description={course.description}
                  imageUrl={course.image_url}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}

export default SearchCourse;
