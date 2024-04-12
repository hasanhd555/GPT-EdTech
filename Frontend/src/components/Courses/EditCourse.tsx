import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Spinner, Button } from "react-bootstrap";
import {
  getCourseAllInfoAPI,
  updateLessonAPI,
  updateQuestionAPI,
} from "../../constant";
import {  lesson_type, question_type } from "../../constant";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../../redux/hooks"; // Redux hook to access the store
import { NavigateFunction, useNavigate } from "react-router"; // Hook for navigation
import EditCourseDetails from "./EditCourseDetails"; // Component for editing course details
import EditCourseImage from "./EditCourseImage";

function EditCourse() {
  const [courseId, setCourseId] = useState("");
  const [lessons, setLessons] = useState<lesson_type[]>([]);
  const [questions, setQuestions] = useState<question_type[]>([]);
  const [editModeLessons, setEditModeLessons] = useState(false);
  const [editableLessons, setEditableLessons] = useState<lesson_type[]>([]);
  const [editModeQuestions, setEditModeQuestions] = useState(false);
  const [editableQuestions, setEditableQuestions] = useState<question_type[]>(
    []
  );

  const [savingLessons, setSavingLessons] = useState(false);
  const [savingQuestions, setSavingQuestions] = useState(false);
  const navigate: NavigateFunction = useNavigate();
  const { isAdmin, email, _id } = useAppSelector((state) => state.User);

  // Validation schema for a single lesson
  const lessonSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  // Validation schema for the array of lessons
  const validationSchema = Yup.object().shape({
    lessons: Yup.array().of(lessonSchema),
  });

  // Validation schema for a single question
  const questionSchema = Yup.object().shape({
    question_text: Yup.string().required("Question text is required"),
    options: Yup.array()
      .of(Yup.string().required("Option text is required"))
      .min(2, "At least two options are required"),
    correct_answer: Yup.number()
      .required("A correct answer is required")
      .min(0, "Invalid answer selected")
      .max(3, "Invalid answer selected"),
    concept: Yup.string().required("Concept is required"),
  });

  // Validation schema for the array of questions
  const quizValidationSchema = Yup.object().shape({
    questions: Yup.array().of(questionSchema),
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    async function fetchCourseInfo() {
      if (courseId) {
        try {
          setCourseId(courseId);
          const response = await axios.get(
            `${getCourseAllInfoAPI}?courseId=${courseId}`
          );
          const { course, lessons, questions, imageUrl } = response.data;

          setLessons(lessons);
          setQuestions(questions);
          setEditableLessons(lessons);
          setEditableQuestions([...questions]);
        } catch (error) {
          console.error("Error fetching course info", error);
        }
      }
    }

    fetchCourseInfo();
  }, []);

  const handleSaveQuestionsChanges = async (questions: question_type[]) => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");
    if (!courseId) return;

    try {
      setSavingQuestions(true); // Set loading to true before the request
      // Assuming you're updating all questions at once or individually in a loop
      for (const question of questions) {
        await axios.put(`${updateQuestionAPI}/${question._id}`, {
          question_text: question.question_text,
          correct_answer: question.correct_answer,
          options: question.options,
          concept: question.concept, // Ensure the concept is updated
        });
      }

      // Refetch updated questions to update local state
      const response = await axios.get(
        `${getCourseAllInfoAPI}?courseId=${courseId}`
      );
      const updatedQuestions = response.data.questions;
      setQuestions(updatedQuestions); // Update questions with the newly fetched data
      setEditableQuestions(updatedQuestions); // Update editable questions with the latest data
      setEditModeQuestions(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating questions", error);
      // Handle error appropriately
    } finally {
      setSavingQuestions(false); // Set loading to false after the request
    }
  };

  const handleCancelQuestionsChanges = () => {
    setEditableQuestions([...questions]);
    setEditModeQuestions(false);
  };

  const handleSaveLessonsChanges = async (
    lessons: lesson_type[],
    actions: FormikHelpers<{ lessons: lesson_type[] }>
  ) => {
    try {
      setSavingLessons(true); // Set loading to true before the request
      const params = new URLSearchParams(window.location.search);
      const courseId = params.get("id");
      // Assuming you're updating all lessons at once or individually in a loop
      for (const lesson of lessons) {
        await axios.put(`${updateLessonAPI}/${lesson._id}`, lesson);
      }
      // After all lessons are updated, you might want to refetch course info or directly update the state
      actions.setSubmitting(false);
      // After all lessons are updated, refetch course info
      const response = await axios.get(
        `${getCourseAllInfoAPI}?courseId=${courseId}`
      );
      const { lessons: updatedLessons } = response.data;

      setLessons(updatedLessons); // Update lessons with the newly fetched data
      setEditableLessons(updatedLessons); // Update editable lessons with the latest data
      setEditModeLessons(false); // Exit edit mode for lessons
    } catch (error) {
      console.error("Error updating lessons", error);
      actions.setSubmitting(false);
    } finally {
      setSavingLessons(false); // Set loading to false after the request
    }
  };

  // Lessons Edit Mode Toggle
  const toggleEditModeLessons = () => {
    setEditModeLessons(!editModeLessons);
  };

  return (
    <div className="mt-2 mb-3">
      <div>
        <h2 className="display-5 text-center fw-bold">Edit Course</h2>
      </div>
      <div
        style={{ width: "70%" }}
        className="mx-auto shadow p-3 border rounded"
      >
        <EditCourseDetails courseId={courseId} />

        <EditCourseImage courseId={courseId} />

        {/* Lessons Editing Interface */}
        <div className="mx-auto border rounded border-primary p-3 m-3">
          <h3 className="display-4 text-center fw-bold mt-4 text-primary">
            Lessons Section
          </h3>
          {editModeLessons ? (
            <Formik
              initialValues={{ lessons: editableLessons }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                handleSaveLessonsChanges(values.lessons, actions);
              }}
            >
              {({ values, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <FieldArray name="lessons">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.lessons.length > 0 &&
                          values.lessons.map(
                            (lesson: lesson_type, index: number) => (
                              <div key={index} className="card mb-3">
                                <div className="card-body">
                                  <h3 className="card-title text-primary text-center fw-bold">
                                    Lesson {index + 1}
                                  </h3>
                                  <h5 className="fw-bold">Title</h5>
                                  <Field
                                    name={`lessons.${index}.title`}
                                    placeholder="Title"
                                    type="text"
                                    className="form-control mb-2  text-primary" // Add mb-2 for margin bottom to the title field
                                    style={{ marginBottom: "10px" }} // Alternatively, you can use inline styles for specific margin values
                                  />
                                  <ErrorMessage
                                    name={`lessons.${index}.title`}
                                    component="div"
                                    className="text-danger" // Apply red color style
                                  />
                                  <h5 className="fw-bold">Content</h5>
                                  <Field
                                    name={`lessons.${index}.content`}
                                    placeholder="Content"
                                    as="textarea"
                                    className="form-control mb-2  text-primary" // Add mb-2 for margin bottom to the content field
                                    style={{
                                      marginBottom: "10px",
                                      marginTop: "10px",
                                    }} // Adding margin top and bottom for spacing around the content field
                                  />
                                  <ErrorMessage
                                    name={`lessons.${index}.content`}
                                    component="div"
                                    className="text-danger" // Apply red color style
                                  />
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    )}
                  </FieldArray>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      type="submit"
                      className="btn btn-success me-2"
                      disabled={isSubmitting}
                    >
                      Save All Lessons
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={toggleEditModeLessons}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              {/* Corrected Display mode for lessons */}
              {lessons.map((lesson, index) => (
                <Card key={lesson._id || index} className="mt-2 mb-2">
                  <Card.Body>
                    {/* className="card-title text-primary text-center fw-bold" */}
                    <Card.Title className="text-primary text-center fw-bold fs-3">
                      Lesson {index + 1}
                    </Card.Title>
                    <Card.Text>
                      <span className="fw-bold">Title : </span>
                      <span className="card-title text-primary text-center fw-bold">
                        {lesson.title}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">Content : </span>
                      <span className="card-title text-primary text-center fw-bold">
                        {lesson.content}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
              <div className="text-center mt-3 mb-3">
                <Button variant="primary" onClick={toggleEditModeLessons}>
                  Edit Lessons
                </Button>
              </div>
            </>
          )}
          {savingLessons && <Spinner animation="border" variant="primary" />}
        </div>

        {/* Quiz Questions Viewing and Editing Interface */}
        <div className="mx-auto border rounded border-primary p-3">
          <h3 className="display-4 text-center fw-bold mt-4 text-primary">
            Quiz Questions
          </h3>
          {!editModeQuestions ? (
            <>
              {questions.map((question, index) => (
                <Card key={index} className="mt-2 mb-2">
                  <Card.Body>
                    <Card.Title className="card-title text-primary text-center fw-bold fs-3">
                      Question {index + 1}
                    </Card.Title>
                    <Card.Text className="card-title  fw-bold">
                      Question Statement
                    </Card.Text>
                    <Card.Text className="text-primary  fw-bold">
                      {question.question_text}
                    </Card.Text>
                    <hr />
                    {question.options.map((option, optionIndex) => (
                      <Card.Text key={optionIndex}>
                        <span className="card-title fw-bold">
                          Option {optionIndex + 1} :{" "}
                        </span>
                        <span className="text-primary  fw-bold">{option}</span>
                      </Card.Text>
                    ))}
                    <hr />
                    <Card.Text>
                      <span className="card-title   fw-bold">
                        Correct Answer : {"  "}
                      </span>
                      <span className="text-primary  fw-bold">
                        Option
                        {question.correct_answer + 1}
                      </span>
                    </Card.Text>
                    <hr />
                    <Card.Text>
                      <span className="card-title   fw-bold">
                        Concept : {"  "}
                      </span>
                      <span className="text-primary  fw-bold">
                        {question.concept}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={() => setEditModeQuestions(true)}
                >
                  Edit Questions
                </Button>
              </div>
            </>
          ) : (
            // The Formik component for editing quiz questions as you've defined above
            <Formik
              initialValues={{ questions: editableQuestions }}
              validationSchema={quizValidationSchema}
              onSubmit={(values, actions) => {
                handleSaveQuestionsChanges(values.questions).then(() => {
                  setEditModeQuestions(false); // Make sure to set edit mode to false after saving
                  actions.setSubmitting(false);
                });
              }}
            >
              {({ values, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <FieldArray name="questions">
                    {() => (
                      <div>
                        {values.questions.map((question, index) => (
                          <div key={index} className="mb-3">
                            <h4 className="card-title text-primary text-center fw-bold fs-3">
                              Question {index + 1}
                            </h4>
                            <h6 className="card-title  fw-bold">
                              Question Statement
                            </h6>
                            <Field
                              name={`questions[${index}].question_text`}
                              placeholder="Question Text"
                              className="form-control mb-2  text-primary"
                            />

                            <ErrorMessage
                              name={`questions[${index}].question_text`}
                              component="div"
                              className="text-danger"
                            />
                            <hr />
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="mb-2">
                                <span className="card-title fw-bold">
                                  Option {optionIndex + 1}
                                </span>
                                <Field
                                  name={`questions[${index}].options[${optionIndex}]`}
                                  placeholder={`Option ${optionIndex + 1}`}
                                  className="form-control  text-primary"
                                />
                                <ErrorMessage
                                  name={`questions[${index}].options[${optionIndex}]`}
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            ))}
                            <hr />
                            <span className="card-title   fw-bold">
                              Correct Answer
                            </span>
                            <Field
                              as="select"
                              name={`questions[${index}].correct_answer`}
                              className="form-select mb-2  text-primary"
                            >
                              <option value="">Select Correct Answer</option>
                              {question.options.map((_, optionIndex) => (
                                <option
                                  key={optionIndex}
                                  value={optionIndex}
                                >{`Option ${optionIndex + 1}`}</option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name={`questions[${index}].correct_answer`}
                              component="div"
                              className="text-danger"
                            />
                            <hr />
                            <span className="card-title   fw-bold">
                              Concept
                            </span>
                            <Field
                              name={`questions[${index}].concept`}
                              placeholder="Concept"
                              className="form-control mb-2  text-primary"
                            />
                            <ErrorMessage
                              name={`questions[${index}].concept`}
                              component="div"
                              className="text-danger"
                            />
                            <hr />
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      type="submit"
                      className="btn btn-success  me-2"
                      disabled={isSubmitting}
                    >
                      Save Questions
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleCancelQuestionsChanges}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          {savingQuestions && <Spinner animation="border" variant="primary" />}
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
