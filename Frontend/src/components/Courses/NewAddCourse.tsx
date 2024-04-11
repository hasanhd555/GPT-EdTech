import React, { useState, FormEvent } from "react";
import { Card, Button, Spinner, Toast } from "react-bootstrap";
// import from constant
import { CreateNewCourse, CloudinaryUploadAPI } from "../../constant";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import { FormikHelpers } from "formik";
import { v4 as uuidv4 } from "uuid";

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
});

interface Lesson {
  id: string;
  title: string;
  content: string;
}

interface FormValues {
  courseName: string;
  courseDescription: string;
  lessons: Lesson[];
}

const NewAddCourse: React.FC = () => {
  const navigate = useNavigate();

  const [courseImage, setCourseImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [lessonError, setLessonError] = useState<string>("");

  const { isAdmin, email, _id } = useAppSelector((state) => state.User);

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

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>
  ) => {
    setIsUploading(true);

    try {
      // Custom validation for lessons
      if (
        values.lessons.length === 0 ||
        values.lessons.every((lesson) => !lesson.title || !lesson.content)
      ) {
        // Use Formik's setErrors method to set a form-level error for lessons
        setErrors({ lessons: "At least one lesson with title and content is required." });

        setSubmitting(false);
        setIsUploading(false);
        return;
      }

      const { courseName, courseDescription, lessons } = values;
      let obj = {
        name: courseName,
        description: courseDescription,
        image_url: courseImage,
        lessons: lessons.map(({ title, content }) => ({ title, content })),
      };
      console.log("obj", obj);
      const response = await axios.post(CreateNewCourse, obj);

      console.log("Course creation successful", response.data);
      setShowSuccessToast(true);
      navigate("/dash-admin");
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
        <h2 className="display-3 text-center fw-bold">New Create new course</h2>
      </div>
      <div style={{ width: "70%" }} className="mx-auto">
        <Formik
          initialValues={{
            courseName: "",
            courseDescription: "",
            lessons: [{ id: uuidv4(), title: "", content: "" }],
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
            errors,
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
                      className="form-control"
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
                      className="form-label fw-bold"
                    >
                      Course Description
                    </label>
                    <Field
                      as="textarea"
                      name="courseDescription"
                      className="form-control"
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
              <div className="mb-3">
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
                {isUploading && <Spinner animation="border" />}
                {courseImage && (
                  <img
                    src={courseImage}
                    alt="Course"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                )}
              </div>

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
                            <h5 className="mb-3">Lesson {index + 1}</h5>
                            <div className="mb-3">
                              <label className="form-label">Title</label>
                              <input
                                className="form-control"
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
                              <label className="form-label">Content</label>
                              <textarea
                                className="form-control"
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
                              >
                                Remove Lesson
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                    <Button
                      onClick={() =>
                        push({ id: uuidv4(), title: "", content: "" })
                      }
                    >
                      Add Lesson
                    </Button>
                  </div>
                )}
              </FieldArray>

              {/* Displaying Form-level Custom Error Message for Lessons */}
{errors.lessons && typeof errors.lessons === 'string' && (
  <div className="alert alert-danger">{errors.lessons}</div>
)}


              {/* Submit Button  */}
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="btn btn-primary mx-auto mt-2"
                  disabled={isSubmitting || isUploading}
                >
                  {isSubmitting || isUploading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
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
  );
};

export default NewAddCourse;
