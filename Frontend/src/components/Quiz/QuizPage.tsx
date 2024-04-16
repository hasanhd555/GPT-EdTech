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
  const { isAdmin, email, _id } = useAppSelector((state) => state.User); // redux user state
  const [courseID, setCourseID] = useState(""); // Course ID state
  const navigate = useNavigate();// Navigator Function
  const [questions, setQuestions] = useState<question_type[]>([]); // Array of Quiz Questions
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]); // Array of correct answer options. Where index is the question number
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]); // Array of use choices for each question
  const [showModal, setShowModal] = useState(false); // modal display control state
  const [totalPoints, setTotalPoints] = useState(0); // total points scored by user
  const [correctCount, setCorrectCount] = useState(0); // total number of correct answers by user
  const [incorrectCount, setIncorrectCount] = useState(0); // total number of incorrect answers by user
  const [incorrectIndices, setIncorrectIndices] = useState<number[]>([]); // indices of incorrect answers
  const [incorrectConcepts, setIncorrectConcepts] = useState<string[]>([]); // concepts of incorrect questions
  const [rating, setRating] = useState(2); // Course Rating State, by default 2 if user does not rate (False Advertising)
  const [submitted, setSubmitted] = useState(false); // submittion state
  const [emtpyQuiz,setEmptyQuiz] = useState(false);


  //Handle Change in Rating
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  // Handle Quiz Result
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
          // Set Questions array
          setQuestions(response?.data);
          if(response.data.length === 0)
          {
            setEmptyQuiz(true);
            setTimeout(() => {
              navigate(`/course-content?id=${id}`); // Redirect to other page after 5 seconds
            }, 3000);

          }
          // Set Correct answers array
          setCorrectAnswers(
            response?.data.map(
              (question: question_type) => question?.correct_answer
            )
          );
          setSelectedOptions(Array(response?.data.length).fill(-1)); // Initialize selectedOptions array with -1 for unattempted options
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  // Handle User MCQ option select event
  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions];
      updatedOptions[questionIndex] = optionIndex + 1;
      return updatedOptions;
    });
  };

  /// Handle User MCQ option select event
  const isOptionSelected = (questionIndex: number, optionIndex: number) => {
    return selectedOptions[questionIndex] === optionIndex + 1;
  };


  // Handle Submittion Logic
  const handleSubmit = () => {
    if (selectedOptions.includes(-1)) {
      const totalPointsCalc = questions.length * 10;
      const correctCountCalc = 0;
      const incorrectCountCalc = questions.length;

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
    } else {
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
    }
  };
  const [chatbotActive, setChatbotActive] = useState(false);

  // chatbot display state
  const toggleChatbot = () => {
    setChatbotActive((prevChatbotActive) => !prevChatbotActive);
  };

  return (
    <Container className="my-5 text-left px-5">
      {submitted ? (
        <ChatBot toggleChatbot={toggleChatbot} chatbotActive={chatbotActive} />
      ) : null}
      {emtpyQuiz ? (
        <>
        <h1>This course does not have a quiz yet</h1>
        <h1>Please Come back Later :(</h1>
        <h1>You will be redirected shortly</h1>
        </>
      ):(
      <>
        <h1 className="text-center" style={{ textDecoration: "underline" }}>
         Quiz
      </h1>
      <h4 className="text-center">Your Time has Begun</h4>
      <h4 className="text-center">Good Luck</h4>

      <div className="d-flex justify-content-center my-5">
        <CountdownCircleTimer
          isPlaying={!submitted}
          duration={questions?.length * 60}
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
        <Button variant={selectedOptions.includes(-1) ? ("primary disabled"):("primary")} size="lg" onClick={handleSubmit}>
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
          <h5>Answer Key:</h5>
          {correctAnswers.map((question,index)=>(
            <p key={index}>Question {index+1} = option {question}</p>
          ))}
          <h5>You Statistics:</h5>
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
      </>)}
      
    </Container>
  );
}

export default QuizPage;
