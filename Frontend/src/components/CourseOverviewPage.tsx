import React from "react";
import NavbarComp from "./Navbar and Footer/Navbar";
import Footer from "./Navbar and Footer/Footer";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import StarRating from "./StarRating";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

interface Lesson {
  _id: string;
  lesson_num: number;
  title: string;
  content: string;
}

interface Comment {
  username: string;
  comment_text: string;
}

const CourseOverviewPage = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [courseData, setCourseData] = useState({
    _id: "",
    title: "",
    description: "",
    image_url: "",
  });
  const [averageRating, setAverageRating] = useState({
    averageRating: 0,
  });

  useEffect(() => {
    // Extracting id from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // console.log("helloooo");

    if (id) {
      // Making API request using Axios
      //   console.log("Successfully fetched id from the url: ",id);
      axios
        .post("http://localhost:5001/api/course/get-info", { id })
        .then((response) => {
          // Handle response
          //   console.log(response.data);
          const course = response.data;
          setCourseData(course);
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
      axios
        .post("http://localhost:5001/api/course/lessons/get-by-id", { id })
        .then((response) => {
          // Handle response
          //   console.log(response.data);
          const chapters: Lesson[] = response.data;
          //   console.log("Chapters: ", chapters);
          setLessons(chapters);
          //   console.log(lessons);
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
      axios
        .post("http://localhost:5001/api/course/ratings/get-by-id", { id })
        .then((response) => {
          // Handle response
          const avgRating = response.data;
          setAverageRating(avgRating);
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
      axios
        .post("http://localhost:5001/api/course/comments/get-by-id", { id })
        .then((response) => {
          // Handle response
          //   console.log(response.data);
          const allComments = response.data;
          console.log(allComments);
          setComments(allComments);
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
    }
  }, [navigate]);

  return (
    <>
      <Container className="" fluid style={{ backgroundColor: "#F7F7F8" }}>
        <Row
          className="mx-5"
          // style={{ border: "1px solid red" }}
        >
          <Col
            className="d-flex flex-column p-5 justify-content-center align-items-center"
            // style={{ border: "1px solid green" }}
          >
            {/* will render course title and description in this column */}
            <h1 className="text-center">{courseData.title}</h1>
            <p className=" mt-3 w-75 text-center">{courseData.description}</p>
          </Col>
          <Col
            className="d-flex flex-column p-5"
            // style={{ border: "1px solid green" }}
          >
            {/* Image will be rendered in this column*/}

            <Image
              fluid
              src={courseData.image_url}
              alt="Course Page"
              className="m-auto"
              style={{ width: "30vw", height: "auto" }}
            />
          </Col>
        </Row>
        <Row
          className="mx-5"
          // style={{ border: "1px solid blue" }}
        >
          <Col
            className="d-flex flex-column p-5 align-items-center"
            // style={{ border: "1px solid orange" }}
          >
            <h2 className="text-decoration-underline">Chapters</h2>
            {/* Chapters of course will be rendered here like a list */}
            <ListGroup className="w-75">
              {lessons.map((lesson) => (
                <ListGroup.Item key={lesson._id} className="p-3 mt-3">
                  <h4>{lesson.title}</h4>
                  <h6 className="text-black-50">Lesson {lesson.lesson_num}</h6>
                  <p>{lesson.content}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col
            className="d-flex flex-column p-5 align-items-center"
            // style={{ border: "1px solid orange" }}
          >
            {/* Rating will be fetched and passed to StarRating component */}
            <StarRating rating={averageRating.averageRating} />
            <h2 className="text-decoration-underline mt-5">
              Community Comments
            </h2>
            {/* Community comments will be rendered here like a list */}
            <ListGroup className="w-75">
              {comments.map((comment) => (
                <ListGroup.Item className="p-3 mt-3 border-0">
                  <h4>{comment.username}</h4>
                  <h6 className="text-black-50">{comment.comment_text}</h6>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CourseOverviewPage;
