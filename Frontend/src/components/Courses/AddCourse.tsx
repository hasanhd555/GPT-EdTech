import React, { useState, FormEvent } from "react";
import Card from "react-bootstrap/Card";

interface Lesson {
  title: string;
  content: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctOption: number; // Index of the correct option
}

const AddCourse: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    {
      question: "",
      options: ["", "", "", ""],
      correctOption: -1,
    },
  ]);

  const addLesson = () => {
    setLessons((lessons) => [...lessons, { title: "", content: "" }]);
  };

  const handleLessonChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setLessons((lessons) =>
      lessons.map((lesson, i) =>
        i === index ? { ...lesson, [name]: value } : lesson
      )
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Process submission here
    console.log("Course and lessons submitted: ", lessons);
  };

  const removeLesson = (index: number) => {
    setLessons((lessons) => lessons.filter((_, i) => i !== index));
  };

  const handleQuizQuestionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionIndex: number,
    optionIndex?: number // This is only used for options, not for the question itself
  ) => {
    const { value } = event.target;

    // Update a quiz question
    if (typeof optionIndex === "undefined") {
      // If optionIndex is undefined, it means we're updating the question text
      const updatedQuizQuestions = quizQuestions.map((quizQuestion, idx) =>
        idx === questionIndex
          ? { ...quizQuestion, question: value }
          : quizQuestion
      );
      setQuizQuestions(updatedQuizQuestions);
    } else {
      // Update an option value
      const updatedOptions = quizQuestions[questionIndex].options.map(
        (option, idx) => (idx === optionIndex ? value : option)
      );
      const updatedQuizQuestions = quizQuestions.map((quizQuestion, idx) =>
        idx === questionIndex
          ? { ...quizQuestion, options: updatedOptions }
          : quizQuestion
      );
      setQuizQuestions(updatedQuizQuestions);
    }
  };

  const handleCorrectOptionChange = (index: number, optionIndex: number) => {
    const updatedQuizQuestions = quizQuestions.map((qq, i) =>
      i === index ? { ...qq, correctOption: optionIndex } : qq
    );
    setQuizQuestions(updatedQuizQuestions);
  };

  const addQuizQuestion = () => {
    setQuizQuestions((quizQuestions) => [
      ...quizQuestions,
      { question: "", options: ["", "", "", ""], correctOption: -1 },
    ]);
  };

  const removeQuizQuestion = (index: number) => {
    setQuizQuestions((quizQuestions) =>
      quizQuestions.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="mt-2 mb-3">
      <div>
        <h2 className="display-5 text-center fw-bold">
          Welcome to Add a new course page
        </h2>
      </div>
      <div style={{ width: "70%" }} className="mx-auto">
        <form onSubmit={handleSubmit}>
          <Card border="primary" className="mt-2 mb-2">
            <Card.Body>
              <Card.Title className="display-6 text-center fw-bold">
                Course Details
              </Card.Title>

              {/* Add Course name and description form here */}
              <div className="mb-3">
                <label htmlFor="courseName" className="form-label fw-bold">
                  Course Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="courseName"
                  placeholder="Enter course name"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="courseDescription"
                  className="form-label fw-bold"
                >
                  Course Description
                </label>
                <textarea
                  className="form-control"
                  id="courseDescription"
                  rows={3}
                  placeholder="Enter course description"
                ></textarea>
              </div>
            </Card.Body>
          </Card>

          {/* Lesson forms */}
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="mt-2 mb-2 border border-primary border-1 rounded p-2"
            >
              {/* Omitted for brevity */}

              <Card.Title className="display-6 text-center fw-bold">
                Lesson {index + 1} Details
              </Card.Title>

              <div className="mb-3">
                <label
                  htmlFor={`lessonTitle-${index}`}
                  className="form-label fw-bold"
                >
                  Lesson Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter lesson title"
                  value={lesson.title}
                  onChange={(e) => handleLessonChange(e, index)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor={`lessonContent-${index}`}
                  className="form-label fw-bold"
                >
                  Content
                </label>
                <textarea
                  className="form-control"
                  name="content"
                  rows={3}
                  placeholder="Enter lesson content"
                  value={lesson.content}
                  onChange={(e) => handleLessonChange(e, index)}
                ></textarea>
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeLesson(index)}
                style={{ marginTop: "10px" }}
              >
                Remove Lesson
              </button>
            </div>
          ))}
          <div>
            {/* Add another lesson form  */}
            <button
              type="button"
              className="btn btn-primary mx-auto"
              onClick={addLesson}
            >
              Add New Lesson
            </button>
          </div>

          {/* Quiz form */}
          <div>
            <h3 className="display-6 text-center fw-bold mt-4">
              Quiz Questions
            </h3>
            {quizQuestions.map((quizQuestion, index) => (
              <div
                key={index}
                className="mb-4 border border-secondary rounded p-3"
              >
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Quiz Question {index + 1}
                  </label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Enter quiz question"
                    value={quizQuestion.question}
                    onChange={(e) => handleQuizQuestionChange(e, index)}
                  ></textarea>
                </div>
                {quizQuestion.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="mb-2 d-flex align-items-center"
                  >
                    <input
                      type="radio"
                      name={`correctOption-${index}`}
                      checked={quizQuestion.correctOption === optionIndex}
                      onChange={() =>
                        handleCorrectOptionChange(index, optionIndex)
                      }
                      className="me-2"
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleQuizQuestionChange(e, index, optionIndex)
                      }
                    />
                  </div>
                ))}
              <button
              type="button"
              className="btn btn-danger mb-3"
              onClick={() => removeQuizQuestion(index)}
            >
              Remove Quiz Question
            </button>
          </div>
        ))}
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={addQuizQuestion}
            >
              Add Quiz Question
            </button>
          </div>

          <div>
            <button type="submit" className="btn btn-primary mx-auto mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
