import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";

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
          "http://localhost:5001/api/enrollment/courses",
          {
            user_id: "sssss",
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <Container className="text-center">
      <h2>
        Search Results for:<br></br> {query}
      </h2>
    </Container>
  );
}

export default SearchCourse;
