import React, { useState, FormEvent, useEffect } from "react";
import { Card, Spinner, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import from constant
import { CreateNewCourse, CloudinaryUploadAPI } from "../../constant";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import { FormikHelpers } from "formik";
import { v4 as uuidv4 } from "uuid";

// Schema for validating course form data
const courseSchema = yup.object().shape({
  courseName: yup.string().required("Course Name is required"),
  courseDescription: yup.string().required("Course Description is required"),
  lessons: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        title: yup.string().required("Lesson title is required"),
        content: yup.string().required("Lesson content is required"),
      })
    )
    .min(1, "At least one lesson is required"),
  quizQuestions: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        question: yup.string().required("Question is required"),
        options: yup
          .array()
          .of(yup.string().required("Option is required"))
          .min(1, "At least one option is required"),
        correctOption: yup
          .number()
          .min(0, "A correct option is required")
          .required(),
        concept: yup.string().required("Concept is required"),
      })
    )
    .min(1, "At least one quiz question is required"),
});

// Interfaces for lessons and quiz questions
interface Lesson {
  id: string;
  title: string;
  content: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  concept: string;
}

interface FormValues {
  courseName: string;
  courseDescription: string;
  lessons: Lesson[];
  quizQuestions: QuizQuestion[];
}

const AddCourse: React.FC = () => {
  const navigate = useNavigate();

  const [courseImage, setCourseImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { isAdmin, email, _id } = useAppSelector((state) => state.User);
  // Redirect non-admin users to the homepage immediately after component mounts

  // Ensure only admins can access this route
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  // Handles course image upload to Cloudinary
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gpt_edtech360"); // Adjust the upload preset

      setIsUploading(true);

      try {
        const response = await fetch(CloudinaryUploadAPI, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setCourseImage(data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Submit handler for course form
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    setIsUploading(true);

    try {
      // Validations for lessons and quiz questionss
      if (
        values.lessons.length === 0 ||
        values.lessons.every((lesson) => !lesson.title || !lesson.content)
      ) {
        // Use Formik's setErrors method to set a form-level error for lessons
        setErrors({
          lessons: "At least one lesson with title and content is required.",
        });

        setSubmitting(false);
        setIsUploading(false);
        return;
      }

      // Custom validation for quiz questions
      if (
        values.quizQuestions.length === 0 ||
        values.quizQuestions.every(
          (q) =>
            !q.question ||
            q.options.length < 4 ||
            q.correctOption < 0 ||
            q.options.some((option) => option.trim() === "") ||
            q.concept.trim() === ""
        )
      ) {
        setErrors({
          quizQuestions:
            "Each quiz question must have a question text, at least four options, and a selected correct option.",
        });
        setIsUploading(false);
        setSubmitting(false);
        return;
      }

      // Construct course data object to be sent to backend
      const { courseName, courseDescription, lessons, quizQuestions } = values;
      const courseData = {
        adminId: _id,
        name: courseName,
        description: courseDescription,
        image_url: courseImage,
        lessons: lessons.map(({ title, content }) => ({ title, content })),
        quizQuestions: quizQuestions.map(
          ({ question, options, correctOption, concept }) => ({
            question,
            options,
            correctOption,
            concept,
          })
        ),
      };

      console.log("courseData", courseData);
      const response = await axios.post(CreateNewCourse, courseData);

      console.log("Course creation successful", response.data);
      setShowSuccessToast(true);
      // Delay navigation by 3 seconds
      setTimeout(() => {
        navigate("/dash-admin");
      }, 3000);
    } catch (error) {
      console.error("There was an error creating the course", error);
    } finally {
      setIsUploading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-2 mb-3">
      <div>
        <h2 className="display-3 text-center fw-bold">Create new course</h2>
      </div>
      <div
        style={{ width: "70%" }}
        className="mx-auto shadow p-3 border rounded"
      >
         {/* Formik setup for course creation form */}
        <Formik
          initialValues={{
            courseName: "",
            courseDescription: "",
            lessons: [{ id: uuidv4(), title: "", content: "" }],
            quizQuestions: [
              {
                id: uuidv4(),
                question: "",
                options: Array(4).fill(""),
                correctOption: -1,
                concept: "",
              },
            ],
          }}
          validationSchema={courseSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Card border="primary" className="mt-2 mb-2">
                <Card.Body>
                  <Card.Title className="display-6 text-center fw-bold text-primary">
                    Course Details
                  </Card.Title>
                  <div className="mb-3">
                    <label htmlFor="courseName" className="form-label fw-bold">
                      Course Name
                    </label>
                    <Field
                      type="text"
                      name="courseName"
                      className="form-control text-primary"
                      placeholder="Enter course name"
                    />
                    <ErrorMessage
                      name="courseName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="courseDescription"
                      className="form-label fw-bold "
                    >
                      Course Description
                    </label>
                    <Field
                      as="textarea"
                      name="courseDescription"
                      className="form-control text-primary"
                      rows="3"
                      placeholder="Enter course description"
                    />
                    <ErrorMessage
                      name="courseDescription"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </Card.Body>
              </Card>

              {/* Image Upload Field */}
              <div className="mb-3 border border-primary rounded p-3 ">
                <h5 className="display-5 text-center fw-bold mt-4 text-primary">
                  Course Image
                </h5>
                <label htmlFor="courseImage" className="form-label fw-bold">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="courseImage"
                  onChange={(event) => {
                    handleImageUpload(event);
                    // Optionally, update form field if you store the image URL in Formik state
                  }}
                  disabled={isUploading}
                />
                {isUploading && (
                  <Spinner animation="border" variant="primary" />
                )}
                {courseImage && (
                  <img
                    src={courseImage}
                    alt="Course"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                )}
              </div>

              <div className="border border-primary rounded p-3">
                <h3 className="display-4 text-center fw-bold mt-4 text-primary">
                  Lessons Section
                </h3>

                <FieldArray name="lessons">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.lessons.map((lesson, index) => (
                        <div key={lesson.id}>
                          <Card className="mb-3">
                            <Card.Body>
                              <h3 className="text-primary text-center fw-bold mb-3">
                                Lesson {index + 1}
                              </h3>
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Title
                                </label>
                                <input
                                  className="form-control text-primary"
                                  name={`lessons[${index}].title`}
                                  value={lesson.title}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage
                                  name={`lessons[${index}].title`}
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Content
                                </label>
                                <textarea
                                  className="form-control text-primary"
                                  rows={3}
                                  name={`lessons[${index}].content`}
                                  value={lesson.content}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                ></textarea>
                                <ErrorMessage
                                  name={`lessons[${index}].content`}
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="d-grid gap-2">
                                <Button
                                  variant="danger"
                                  onClick={() => remove(index)}
                                  style={{ width: "20%" }}
                                >
                                  Remove Lesson
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                      <Button
                        className="btn btn-success"
                        onClick={() =>
                          push({ id: uuidv4(), title: "", content: "" })
                        }
                      >
                        Add Lesson
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Quiz Section  */}
              <div className="border border-primary rounded p-3 mt-4">
                <FieldArray name="quizQuestions">
                  {({ push, remove }) => (
                    <div>
                      <h3 className="display-4 text-center fw-bold mt-4 text-primary">
                        Quiz Questions
                      </h3>
                      {values.quizQuestions.map((question, index) => (
                        <Card key={question.id} className="mb-3">
                          <Card.Body>
                            <h5 className="mb-3 text-primary text-center fw-bold fs-3">
                              Question {index + 1}
                            </h5>
                            <div className="mb-3">
                              <Card.Text className="card-title  fw-bold">
                                Question Statement
                              </Card.Text>
                              <Field
                                name={`quizQuestions[${index}].question`}
                                as="textarea"
                                className="form-control text-primary"
                                placeholder="Enter quiz question"
                              />
                              <ErrorMessage
                                name={`quizQuestions[${index}].question`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            {question.options.map((_, optionIndex) => (
                              <div key={optionIndex} className="mb-3">
                                <span className="card-title fw-bold">
                                  Option {optionIndex + 1}
                                </span>
                                <Field
                                  name={`quizQuestions[${index}].options[${optionIndex}]`}
                                  as="input"
                                  className="form-control text-primary"
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                                <ErrorMessage
                                  name={`quizQuestions[${index}].options[${optionIndex}]`}
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            ))}
                            <div className="mb-3">
                              <span className="card-title   fw-bold">
                                Correct Answer
                              </span>
                              <Field
                                name={`quizQuestions[${index}].correctOption`}
                                as="select"
                                className="form-select text-primary"
                              >
                                <option value="">Select Correct Option</option>
                                {question.options.map((option, optionIndex) => (
                                  <option
                                    key={optionIndex}
                                    value={optionIndex}
                                  >{`Option ${optionIndex + 1}`}</option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name={`quizQuestions[${index}].correctOption`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="mb-3">
                              <span className="card-title   fw-bold">
                                Concept
                              </span>
                              <Field
                                name={`quizQuestions[${index}].concept`}
                                as="input"
                                className="form-control text-primary"
                                placeholder="Concept"
                              />
                              <ErrorMessage
                                name={`quizQuestions[${index}].concept`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <Button
                              variant="danger"
                              onClick={() => remove(index)}
                            >
                              Remove Question
                            </Button>
                          </Card.Body>
                        </Card>
                      ))}

                      <Button
                        className="mt-3 btn btn-success"
                        onClick={() =>
                          push({
                            id: uuidv4(),
                            question: "",
                            options: Array(4).fill(""),
                            correctOption: -1,
                            concept: "",
                          })
                        }
                      >
                        Add Question
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="mt-3">
                {/* Displaying Form-level Custom Error Message for Lessons */}
                {errors.lessons && typeof errors.lessons === "string" && (
                  <div className="alert alert-danger">{errors.lessons}</div>
                )}

                {/* Displaying Form-level Custom Error Message for Quiz Questions */}
                {errors.quizQuestions &&
                  typeof errors.quizQuestions === "string" && (
                    <div className="alert alert-danger">
                      {errors.quizQuestions}
                    </div>
                  )}
              </div>

              {/* Submit Button  */}
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="btn btn-primary mx-auto mt-2"
                  disabled={isSubmitting || isUploading}
                >
                  {isSubmitting || isUploading ? "Uploading..." : "Submit"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        {/* Success toast notification */}
        <Toast
          onClose={() => setShowSuccessToast(false)}
          show={showSuccessToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Course Creation</strong>
          </Toast.Header>
          <Toast.Body>Course created successfully!</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default AddCourse;
