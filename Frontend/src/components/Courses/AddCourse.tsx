import React, { useState, FormEvent } from "react";
import Card from "react-bootstrap/Card";
// import from constant
import { CreateNewCourse } from "../../constant";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";


interface Lesson {
  title: string;
  content: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctOption: number; // Index of the correct option
  concept: string;
}

const AddCourse: React.FC = () => {
  const navigate = useNavigate();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    {
      question: "",
      options: ["", "", "", ""],
      correctOption: -1,
      concept: "",
    },
  ]);

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const { isAdmin, email, _id } = useAppSelector((state) => state.User);

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

  const removeLesson = (index: number) => {
    setLessons((lessons) => lessons.filter((_, i) => i !== index));
  };

  const handleQuizQuestionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionIndex: number,
    optionIndex?: number, // This is only used for options, not for the question itself
    isConcept?: boolean // Identify if the change is for the concept field
  ) => {
    const { value } = event.target;

      // If change is for concept, update concept field
      if (isConcept) {
        const updatedQuizQuestions = quizQuestions.map((quizQuestion, idx) =>
          idx === questionIndex ? { ...quizQuestion, concept: value } : quizQuestion
        );
        setQuizQuestions(updatedQuizQuestions);
        return;
      }

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
  //   if (!isConcept && typeof optionIndex !== "undefined") {
  //     // Update specific option text
  //     const updatedOptions = [...quizQuestions[questionIndex].options];
  //     updatedOptions[optionIndex] = event.target.value;
  //     setQuizQuestions(
  //       quizQuestions.map((question, idx) =>
  //         idx === questionIndex
  //           ? { ...question, options: updatedOptions }
  //           : question
  //       )
  //     );
  //   } else {
  //     // Update question text or concept
  //     const field = isConcept ? "concept" : "question";
  //     setQuizQuestions(
  //       quizQuestions.map((question, idx) =>
  //         idx === questionIndex
  //           ? { ...question, [field]: event.target.value }
  //           : question
  //       )
  //     );
  //   }
  // };

  const handleCorrectOptionChange = (index: number, optionIndex: number) => {
    const updatedQuizQuestions = quizQuestions.map((qq, i) =>
      i === index ? { ...qq, correctOption: optionIndex } : qq
    );
    setQuizQuestions(updatedQuizQuestions);
  };

  const addQuizQuestion = () => {
    setQuizQuestions((quizQuestions) => [
      ...quizQuestions,
      {
        question: "",
        options: ["", "", "", ""],
        correctOption: -1,
        concept: "",
      },
    ]);
  };

  const removeQuizQuestion = (index: number) => {
    setQuizQuestions((quizQuestions) =>
      quizQuestions.filter((_, i) => i !== index)
    );
  };

  const handleCourseNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCourseName(event.target.value);
  };

  const handleCourseDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCourseDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Log course details, lessons, and quiz questions
    console.log("Course Name:", courseName);
    console.log("Course Description:", courseDescription);
    console.log("Lessons:", lessons);
    console.log("Quiz Questions:", quizQuestions);
    console.log("here");

    console.log("Admin ID:", _id);
    // Prepare the data object to be sent
    const courseData = {
      adminId: _id,
      name: courseName,
      description: courseDescription,
      lessons: lessons,
      // Ensure each quiz question includes the concept when being sent
      quizQuestions: quizQuestions.map(question => ({
        ...question,
        concept: question.concept
      }))
    };

    try { 
      const response = await axios.post(CreateNewCourse, courseData);
      console.log("Course creation successful", response.data);
      // Alert the user and navigate to the admin dashboard
    alert("Course created successfully!");
    navigate("/dash-admin");
    } catch (error) {
      console.error("There was an error creating the course", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="mt-2 mb-3">
      <div>
        <h2 className="display-3 text-center fw-bold">Create new course</h2>
      </div>
      <div style={{ width: "70%" }} className="mx-auto">
        <form onSubmit={handleSubmit}>
          <Card border="primary" className="mt-2 mb-2">
            <Card.Body>
              <Card.Title className="display-6 text-center fw-bold text-primary">
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
                  required
                  value={courseName}
                  onChange={handleCourseNameChange}
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
                  required
                  value={courseDescription}
                  onChange={handleCourseDescriptionChange}
                ></textarea>
              </div>
            </Card.Body>
          </Card>

          {/* Lesson forms */}
          <h3 className="display-4 text-center fw-bold mt-4 text-primary">
            Lessons Section
          </h3>
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
                  required
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
                  required
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
            <h3 className="display-4 text-center fw-bold mt-4 text-primary">
              Quiz Section
            </h3>
            {quizQuestions.map((quizQuestion, index) => (
              <div
                key={index}
                className="mb-4 border border-primary rounded p-3 y"
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
                    required
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
                      required
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleQuizQuestionChange(e, index, optionIndex)
                      }
                      required
                    />
                    
                  </div>
                ))}
                {/* Concept input field */}
                <div className="mb-3">
                      <label className="form-label fw-bold">Concept</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter concept"
                        value={quizQuestion.concept}
                        onChange={(e) =>
                          handleQuizQuestionChange(e, index, undefined, true)
                        }
                      />
                    </div>
                <button
                  type="button"
                  className="btn btn-danger mb-3"
                  onClick={() => removeQuizQuestion(index)}
                >
                  Remove Question
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={addQuizQuestion}
            >
              Add New Question
            </button>
          </div>
          <hr className="mb-4" />
          <div className="d-flex justify-content-center">
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
