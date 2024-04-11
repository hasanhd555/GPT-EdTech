import React, { useState, FormEvent } from "react";
import { Card, Button, Spinner, Toast } from "react-bootstrap";
// import from constant
import { CreateNewCourse, CloudinaryUploadAPI } from "../../constant";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { FormikHelpers } from 'formik';

const courseSchema = yup.object().shape({
  courseName: yup.string().required("Course Name is required"),
  courseDescription: yup.string().required("Course Description is required"),
});

interface FormValues {
    courseName: string;
    courseDescription: string;
  }
  

const NewAddCourse: React.FC = () => {
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { isAdmin, email, _id } = useAppSelector((state) => state.User);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const newHandleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setIsUploading(true);
  
    try {

        const obj = {
            name: values.courseName,
            description: values.courseDescription,
            image_url: courseImage,
          }
          console.log("obj",obj);
      const response = await axios.post(CreateNewCourse,obj );
  
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
    courseName: '',
    courseDescription: '',
  }}
  validationSchema={courseSchema}
  onSubmit={newHandleSubmit}
>
          {({ isSubmitting }) => (
            <Form>
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
              <label htmlFor="courseImage" className="form-label fw-bold">
                Course Image
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
                <img src={courseImage} alt="Course" style={{ maxWidth: "100%", marginTop: "10px" }} />
              )}
            </div>

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
