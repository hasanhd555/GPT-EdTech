import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import {
  GiveRatingAPI,
  SetPointsAPI,
  getEnrollmentAPI,
  getQuizbyCourseIdAPI,
  question_type,
} from "../../constant";
import { Rating } from "react-simple-star-rating";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ChatBot from "../ChatBot/ChatBot";

function QuizPage() {
  const { isAdmin, email, _id } = useAppSelector((state) => state.User);
  const [courseID, setCourseID] = useState("");
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<question_type[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [incorrectIndices, setIncorrectIndices] = useState<number[]>([]);
  const [incorrectConcepts, setIncorrectConcepts] = useState<string[]>([]);
  const [rating, setRating] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleQuizResult = () => {
    axios
      .post(GiveRatingAPI, {
        course_id: courseID,
        user_id: _id,
        rating: rating,
      })
      .then((response) => {
        if (response) {
          axios
            .post(SetPointsAPI, {
              course_id: courseID,
              user_id: _id,
              points: correctCount * 10,
            })
            .then((response) => {
              if (response) {
                setShowModal(false);
                navigate("/dash-student");
              }
            })
            .catch((error) => {
              // Handle error
              console.error("Error:", error);
            });
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // Error Handling User Not Logged In
    if (_id == null) {
      navigate("/");
    }
    const params = new URLSearchParams(window.location.search);
    const id: string | null = params.get("id");
    if (id !== null) {
      // Error Handling For Unathorzied quiz access
      setCourseID(id);
      axios
        .post(getEnrollmentAPI, {
          user_id: _id,
          course_id: id,
        })
        .then((response) => {
          // Handle response
          if (response?.data?.length === 0) {
            navigate("/");
          }
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
      axios
        .post(getQuizbyCourseIdAPI, {
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
    setSubmitted(true);
  };
  const [chatbotActive, setChatbotActive] = useState(false);
  const toggleChatbot = () => {
    setChatbotActive((prevChatbotActive) => !prevChatbotActive);
  };

  return (
    <Container className="my-5 text-left px-5">
      {submitted ? (
        <ChatBot toggleChatbot={toggleChatbot} chatbotActive={chatbotActive} />
      ) : null}
      <h1 className="text-center" style={{ textDecoration: "underline" }}>
        UI/UX Quiz
      </h1>
      <h4 className="text-center">Your Time has Begun</h4>
      <h4 className="text-center">Good Luck</h4>

      <div className="d-flex justify-content-center my-5">
        <CountdownCircleTimer
          isPlaying={!submitted}
          duration={questions?.length * 300}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={handleSubmit}
        >
          {({ remainingTime }) => {
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;

            return (
              <h1>
                {hours}:{minutes}:{seconds}
              </h1>
            );
          }}
        </CountdownCircleTimer>
      </div>

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
                  disabled={submitted}
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
          <h4 className="text-center">
            Score: {correctCount * 10}/{totalPoints}
          </h4>
          <p>Total Correct Answers: {correctCount}</p>
          <p>Total Incorrect Answers: {incorrectCount}</p>
          <p>Incorrect Questions: {incorrectIndices.join(", ") || "None"}</p>
          <p>Incorrect Concepts: {incorrectConcepts.join(", ") || "None"}</p>
          <h5>Rate this Course</h5>
          <Rating
            onClick={handleRating}
            allowFraction={true}
            showTooltip={true}
            tooltipArray={[
              "Terrible",
              "Terrible+",
              "Bad",
              "Bad+",
              "Average",
              "Average+",
              "Great",
              "Great+",
              "Awesome",
              "Awesome+",
            ]}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleQuizResult}>
            Back to the Dashboard
          </Button>
        </Modal.Footer>
        {/* Need to add back to dashboard navigate along with enrollment point updation */}
      </Modal>
    </Container>
  );
}

export default QuizPage;
