import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Spinner, Card, Button } from "react-bootstrap";
import * as Yup from "yup";
import { getCourseAllInfoAPI, updateCourseDetailsAPI } from "../../constant";

// Type for the incoming course ID prop
interface CourseDetailsProps {
  courseId: string;
}

// Validation schema
const courseValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(2, "Title is too short").max(50, "Title is too long"),
  description: Yup.string().required("Description is required").min(5, "Description is too short"),
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
    axios.get(`${getCourseAllInfoAPI}?courseId=${courseId}`)
      .then(response => {
        const { course, lessons, questions, imageUrl } = response.data;
          setCourse(course);
      })
      .catch(error => console.error("Failed to fetch course", error));
  }, [courseId]);

  const handleSaveChanges = (values: Course, actions: any) => {
    setSaving(true);
    axios.put(`${updateCourseDetailsAPI}/${courseId}`, values)
      .then(response => {
        setCourse(response.data);
        setEditMode(false);
        actions.setSubmitting(false);
      })
      .catch(error => {
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
              title: course?.title || "",  // Fallback to empty string if course is null
              description: course?.description || ""  // Fallback to empty string if course is null
            }}
            validationSchema={courseValidationSchema}
            onSubmit={handleSaveChanges}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="title" className="form-control mb-2" />
                <ErrorMessage name="title" component="div" className="text-danger" />
                <Field as="textarea" name="description" className="form-control mb-2" />
                <ErrorMessage name="description" component="div" className="text-danger" />
                <div className="d-flex justify-content-center mt-3">
                  <Button type="submit" disabled={isSubmitting || saving} className="btn btn-success me-2">
                    Save Changes
                  </Button>
                  <Button type="button" className="btn btn-danger" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            <h5>{course?.title}</h5>
            <p>{course?.description}</p>
            <div className="text-center mt-3 mb-3">
              <Button variant="primary" onClick={() => setEditMode(true)}>
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
