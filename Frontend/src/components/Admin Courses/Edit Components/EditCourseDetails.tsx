import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Spinner, Card, Button } from "react-bootstrap";
import * as Yup from "yup";
import { getCourseAllInfoAPI, updateCourseDetailsAPI } from "../../../constant";

// Type for the incoming course ID prop
interface CourseDetailsProps {
  courseId: string;
}

// Validation schema
const courseValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title is too short")
    .max(50, "Title is too long"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Description is too short"),
});

// Type for the course object
interface Course {
  title: string;
  description: string;
}

// CourseDetails component
function EditCourseDetails({ courseId }: CourseDetailsProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSaving(true);
    axios
      .get(`${getCourseAllInfoAPI}?courseId=${courseId}`)
      .then((response) => {
        const { course, lessons, questions, imageUrl } = response.data;
        setCourse(course);
      })
      .catch((error) => console.error("Failed to fetch course", error))
      .finally(() => setSaving(false));
  }, [courseId]);

  const handleSaveChanges = (values: Course, actions: any) => {
    setSaving(true);
    axios
      .put(`${updateCourseDetailsAPI}/${courseId}`, values)
      .then((response) => {
        setCourse(response.data);
        setEditMode(false);
        actions.setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error updating course details", error);
        actions.setSubmitting(false);
      })
      .finally(() => setSaving(false));
  };

  return (
    <Card border="primary" className="mt-2 mb-2">
      <Card.Body>
        <Card.Title className="display-6 text-center fw-bold text-primary">
          Course Details
        </Card.Title>
        {editMode ? (
          <Formik
            initialValues={{
              title: course?.title || "", // Fallback to empty string if course is null
              description: course?.description || "", // Fallback to empty string if course is null
            }}
            validationSchema={courseValidationSchema}
            onSubmit={handleSaveChanges}
          >
            {({ isSubmitting }) => (
              <Form>
                <h5 className="fw-bold">Course Title</h5>
                <Field
                  name="title"
                  className="form-control mb-2 text-primary"
                  data-testid="course-title-input"
                />

                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                  data-testid="course-title-error"
                />
                <h5 className="fw-bold">Course Description</h5>
                <Field
                  as="textarea"
                  name="description"
                  className="form-control  text-primary"
                  data-testid="course-content-input"
                />

                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                  data-testid="course-content-error"
                />
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting || saving}
                    className="btn btn-success me-2"
                    data-testid="save-course-button"
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            <hr />
            <h5 className="fw-bold">Course Title</h5>

            <h5 className="text-primary fw-bold">{course?.title}</h5>
            <hr />
            <p className="fw-bold">Course Description</p>
            <p className="text-primary fw-bold">{course?.description}</p>
            <hr />

            <div className="text-center mt-3 mb-3">
              <Button variant="primary" onClick={() => setEditMode(true)} data-testid="edit-course-button">
                Edit Course Details
              </Button>
            </div>
          </>
        )}
        {saving && <Spinner animation="border" variant="primary" />}
      </Card.Body>
    </Card>
  );
}

export default EditCourseDetails;
