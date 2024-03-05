import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { question_type } from "../../constant";

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [courseid, setCourseId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id: string | null = params.get("id");
    if (id !== null) {
      setCourseId(id);
      console.log("id set", id);
      axios
        .post("http://localhost:5001/api/course/quiz/get-by-id", {
          course_id: id,
        })
        .then((response) => {
          setQuestions(response?.data);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  //   useEffect(() => {
  //     if (courseid !== null) {
  //       console.log("Not null");
  //       axios
  //         .post("http://localhost:5001/api/course/quiz/get-by-id", { courseid })
  //         .then((response) => {
  //           setQuestions(response?.data);
  //           console.log(response);
  //         })
  //         .catch((error) => {
  //           console.error("Error:", error);
  //         });
  //     }
  //   }, [courseid]);

  return (
    <Container className="my-5 text-left px-5">
      <h1 className="text-center" style={{ textDecoration: "underline" }}>
        UI/UX Quiz
      </h1>
      <h4 className="text-center">Your Time has Begun</h4>
      <h4 className="text-center">Good Luck</h4>
      
      {questions.map((question: question_type, index) => (
        <Card className="text-left my-4 border-primary" key={index}>
          <Card.Body className="px-5">
            <h2>Question {index + 1}:</h2>
            <Card.Text>{question.question_text}</Card.Text>
            <div className="d-grid gap-2 text-start">
              {question?.options?.map((option, index) => (
                <Button
                  variant="outline-primary"
                  className="text-start"
                  size="lg"
                >
                  {String.fromCharCode(65 + index)}) {option}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>
      ))}

      <div className="d-grid gap-2 my-5 ">
        <Button variant="primary" size="lg">
          Submit
        </Button>
      </div>
    </Container>
  );
}

export default QuizPage;
