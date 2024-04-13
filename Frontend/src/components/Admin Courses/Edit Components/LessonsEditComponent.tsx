import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, FormikHelpers } from 'formik';
import { Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup';
import { lesson_type } from "../../../constant";
import { getCourseAllInfoAPI, updateLessonAPI } from "../../../constant";

interface LessonsEditProps {
  courseId: string;
}

interface LessonFormValues {
  lessons: lesson_type[];
}

const LessonsEditComponent: React.FC<LessonsEditProps> = ({ courseId }) => {
  const [lessons, setLessons] = useState<lesson_type[]>([]);
  const [editableLessons, setEditableLessons] = useState<lesson_type[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsSaving(true);
    axios.get(`${getCourseAllInfoAPI}?courseId=${courseId}`)
      .then(response => {
        setLessons(response.data.lessons);
        setEditableLessons(response.data.lessons);
      })
      .catch(error => {
        console.error("Error fetching lessons", error);
      })
      .finally(() => setIsSaving(false));
  }, [courseId]);

  const validationSchema = Yup.object().shape({
    lessons: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        content: Yup.string().required("Content is required"),
      })
    ),
  });

  const handleSaveChanges = async (values: LessonFormValues, actions: FormikHelpers<LessonFormValues>) => {
    setIsSaving(true);
    try {
      for (const lesson of values.lessons) {
        await axios.put(`${updateLessonAPI}/${lesson._id}`, lesson);
      }
      actions.setSubmitting(false);

      // After all lessons are updated, refetch course info
      const response = await axios.get(
        `${getCourseAllInfoAPI}?courseId=${courseId}`
      );
      const { lessons: updatedLessons } = response.data;

      setLessons(updatedLessons); // Update lessons with the newly fetched data
      setEditableLessons(updatedLessons); // Update editable lessons with the latest data

      setEditMode(false);
      setIsSaving(false);
    } catch (error) {
      console.error("Error updating lessons", error);
      actions.setSubmitting(false);
      setIsSaving(false);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="mx-auto border rounded border-primary p-3 m-3">
      <h3 className="display-4 text-center fw-bold mt-4 text-primary">Lessons Section</h3>
      {editMode ? (
        <Formik
          initialValues={{ lessons: editableLessons }}
          validationSchema={validationSchema}
          onSubmit={handleSaveChanges}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <FieldArray name="lessons">
                {({ form }) => (
                  form.values.lessons.map((lesson: lesson_type, index: number) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <h5 className=" fw-bold">Title</h5>
                        <Field name={`lessons.${index}.title`} className="form-control text-primary" placeholder="Enter title" />
                        <ErrorMessage name={`lessons.${index}.title`} component="div" className="text-danger" />
                        <h5 className="fw-bold mt-3">Content</h5>
                        <Field as="textarea" name={`lessons.${index}.content`} className="form-control text-primary" placeholder="Enter content" />
                        <ErrorMessage name={`lessons.${index}.content`} component="div" className="text-danger" />
                      </div>
                    </div>
                  ))
                )}
              </FieldArray>
              <div className="d-flex justify-content-center mt-3">
                <Button type="submit" className="btn btn-success me-2" disabled={isSubmitting || isSaving}>
                  Save Changes
                </Button>
                <Button className="btn btn-danger" onClick={toggleEditMode}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          {lessons.map((lesson, index) => (
            <Card key={lesson._id || index} className="mt-2 mb-2">
              <Card.Body>
                <Card.Title className="text-primary text-center fw-bold fs-3">
                  Lesson {index + 1}
                </Card.Title>
                <Card.Text>
                  <strong>Title: {" "}</strong> 
                  <span className='text-primary'>

                  {lesson.title}
                  </span>
                </Card.Text>
                <Card.Text>
                  <strong>Content: {" "}</strong> 
                  <span className='text-primary'>

                  {lesson.content}
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          <div className="text-center mt-3 mb-3">
            <Button variant="primary" onClick={toggleEditMode}>Edit Lessons</Button>
          </div>
        </>
      )}
      {isSaving && <Spinner animation="border" variant="primary" />}
    </div>
  );
};

export default LessonsEditComponent;