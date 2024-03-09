import React from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { lesson_type, course_type } from "../constant";
import { useState, useEffect } from "react";
import axios from "axios";

const hoverEffectStyle = {
  transition: "background-color 0.3s",
  cursor: "pointer",
};

const CourseContentPage = () => {
  const [selectedItem, setSelectedItem] = useState<HTMLLIElement | null>(null);
  const [lessons, setLessons] = useState<lesson_type[]>([]);
  const [course, setCourse] = useState<course_type>();
  const [courseID, setcourseID] = useState("");
  const [activeLesson, setActiveLesson] = useState<lesson_type>();

  useEffect(() => {
    // Extracting id from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      setcourseID(id);
      axios
        .post("http://localhost:5001/api/course/get-info", { id })
        .then((response) => {
          // Handle response
          setCourse(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
      axios
        .post("http://localhost:5001/api/course/lessons/get-by-id", { id })
        .then((response) => {
          // Handle response
          setLessons(response.data);
          if (response.data) {
            setActiveLesson(response.data[0]);
          }
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
    }
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    const listItem = e.currentTarget;
    if (selectedItem !== listItem) {
      (listItem as HTMLLIElement).style.backgroundColor = "#0D6EFD";
      listItem.querySelectorAll("h4, h6").forEach((element: Element) => {
        if (element instanceof HTMLElement) {
          element.style.color = "white";
        }
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    const listItem = e.currentTarget;
    if (selectedItem !== listItem) {
      (listItem as HTMLLIElement).style.backgroundColor = "";
      listItem.querySelectorAll("h4, h6").forEach((element: Element) => {
        if (element instanceof HTMLElement) {
          element.style.color = "";
        }
      });
    }
  };

  // Function to handle click on a lesson
  const handleClick = (lesson: lesson_type) => {
    if (selectedItem) {
      selectedItem.style.backgroundColor = "";
      selectedItem.querySelectorAll("h4, h6").forEach((element: Element) => {
        if (element instanceof HTMLElement) {
          element.style.color = "";
        }
      });
    }
    setActiveLesson(lesson);
  };

  return (
    <>
      <Container className="d-flex flex-row" fluid>
        <Col
          className="col-md-4 col-sm-12 col-lg-4 p-4 d-flex flex-column align-items-center"
          style={{ backgroundColor: "#F7F7F8" }}
        >
          <h1 className="text-decoration-underline mt-5 text-center">
            Chapters
          </h1>
          {/* Lesson titles and their lesson_num will be rendered here */}
          <ListGroup className="w-75">
            {lessons.map((lesson) => (
              <ListGroup.Item
                key={lesson.lesson_num}
                className="p-3 mt-3"
                style={hoverEffectStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(lesson)}
              >
                <h4>{lesson.title}</h4>
                <h6>Lesson {lesson.lesson_num}</h6>
              </ListGroup.Item>
            ))}
            <Button className="p-3 mt-4 mb-5">Start Quiz</Button>
          </ListGroup>
        </Col>
        <Col className="col-md-8 col-sm-12 p-4 col-lg-8 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center mt-5">{course?.title}</h1>
          <h4 className="text-center mt-5">
            {activeLesson?.title}
          </h4>
          <p className="text-center w-75 mt-5 mb-5">{activeLesson?.content}</p>
        </Col>
      </Container>
    </>
  );
};

export default CourseContentPage;
