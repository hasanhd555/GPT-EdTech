import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { question_type } from "../../constant";
import { Rating } from "react-simple-star-rating";

interface SelectedOptions {
  [key: number]: number; // key represents the question index, value represents the selected option index
}

function QuizPage() {
  const [questions, setQuestions] = useState<question_type[]>([]);
  const [courseid, setCourseId] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [incorrectIndices, setIncorrectIndices] = useState<number[]>([]);
  const [incorrectConcepts, setIncorrectConcepts] = useState<string[]>([]);
  const [rating, setRating] = useState(2);

  const handleRating = (rate: number) => {
    setRating(rate);

    console.log(rate);
    // other logic
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id: string | null = params.get("id");
    if (id !== null) {
      setCourseId(id);
      axios
        .post("http://localhost:5001/api/course/quiz/get-by-id", {
          course_id: id,
        })
        .then((response) => {
          setQuestions(response?.data);
          setCorrectAnswers(
            response?.data.map(
              (question: question_type) => question?.correct_answer
            )
          );
          setSelectedOptions(Array(response?.data.length).fill(0)); // Initialize selectedOptions array
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions];
      updatedOptions[questionIndex] = optionIndex + 1;
      return updatedOptions;
    });
  };

  const isOptionSelected = (questionIndex: number, optionIndex: number) => {
    return selectedOptions[questionIndex] === optionIndex + 1;
  };

  const handleSubmit = () => {
    // Calculate statistics
    const totalPointsCalc = questions.length * 10;
    const correctCountCalc = selectedOptions.reduce(
      (acc, selectedOption, index) =>
        selectedOption === correctAnswers[index] ? acc + 1 : acc,
      0
    );
    const incorrectCountCalc = questions.length - correctCountCalc;
    const incorrectIndicesCalc = selectedOptions.reduce(
      (acc: number[], selectedOption, index) => {
        if (selectedOption !== correctAnswers[index]) {
          acc.push(index);
        }
        return acc;
      },
      []
    );

    // Set statistics
    setTotalPoints(totalPointsCalc);
    setCorrectCount(correctCountCalc);
    setIncorrectCount(incorrectCountCalc);
    setIncorrectIndices(incorrectIndicesCalc);

    const incorrectConcepts = incorrectIndicesCalc.map(
      (index) => questions[index].concept
    );
    setIncorrectConcepts(incorrectConcepts);

    if (incorrectConcepts) {
      setIncorrectIndices(incorrectIndicesCalc.map((value) => value + 1));
    }
    // Show modal
    setShowModal(true);
  };

  return (
    <Container className="my-5 text-left px-5">
      <h1 className="text-center" style={{ textDecoration: "underline" }}>
        UI/UX Quiz
      </h1>
      <h4 className="text-center">Your Time has Begun</h4>
      <h4 className="text-center">Good Luck</h4>

      {questions.map((question: question_type, questionIndex) => (
        <Card className="text-left my-4 border-primary" key={questionIndex}>
          <Card.Body className="px-5">
            <h2>Question {questionIndex + 1}:</h2>
            <Card.Text>{question.question_text}</Card.Text>
            <div className="d-grid gap-2 text-start">
              {question?.options?.map((option, optionIndex) => (
                <Button
                  variant={
                    isOptionSelected(questionIndex, optionIndex)
                      ? "primary"
                      : "outline-primary"
                  }
                  className="text-start"
                  size="lg"
                  key={optionIndex}
                  onClick={() => handleOptionSelect(questionIndex, optionIndex)}
                >
                  {String.fromCharCode(65 + optionIndex)}) {option}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>
      ))}

      <div className="d-grid gap-2 my-5 ">
        <Button variant="primary" size="lg" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      {/* Modal for quiz results */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display quiz results */}
          <p>Total Points: {totalPoints}</p>
          <p>Your Points: {correctCount * 10}</p>
          <p>Total Correct Answers: {correctCount}</p>
          <p>Total Incorrect Answers: {incorrectCount}</p>
          <p>Incorrect Questions: {incorrectIndices.join(", ") || "None"}</p>
          <p>Incorrect Concepts: {incorrectConcepts.join(", ") || "None"}</p>
          <h5>Rate this Course</h5>
          <Rating
            onClick={handleRating}
            allowFraction={true}
            /* Available Props */
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Back to the Dashboard
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default QuizPage;
