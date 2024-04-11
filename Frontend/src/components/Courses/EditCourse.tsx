import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Spinner, Button } from "react-bootstrap";
import {
  getCourseAllInfoAPI,
  updateCourseDetailsAPI,
  updateLessonAPI,
  updateQuestionAPI,
  updateCourseImageAPI,
  CloudinaryUploadAPI,
} from "../../constant"; 
import { course_type, lesson_type, question_type } from "../../constant";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";

function EditCourse() {
  const [course, setCourse] = useState<course_type | null>(null);
  const [lessons, setLessons] = useState<lesson_type[]>([]);
  const [questions, setQuestions] = useState<question_type[]>([]);

  const [editModeCourse, setEditModeCourse] = useState(false);
  const [editModeLessons, setEditModeLessons] = useState(false);
  const [editableCourseName, setEditableCourseName] = useState("");
  const [editableCourseDescription, setEditableCourseDescription] =
    useState("");
  const [editableLessons, setEditableLessons] = useState<lesson_type[]>([]);
  const [editModeQuestions, setEditModeQuestions] = useState(false);
  const [editableQuestions, setEditableQuestions] = useState<question_type[]>(
    []
  );

  const [courseImage, setCourseImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const courseValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(2, "Title is too short")
      .max(50, "Title is too long"),
    description: Yup.string()
      .required("Description is required")
      .min(5, "Description is too short"),
  });

  // Validation schema for a single lesson
  const lessonSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  // Validation schema for the array of lessons
  const validationSchema = Yup.object().shape({
    lessons: Yup.array().of(lessonSchema),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    async function fetchCourseInfo() {
      if (courseId) {
        try {
          const response = await axios.get(
            `${getCourseAllInfoAPI}?courseId=${courseId}`
          );
          const { course, lessons, questions, imageUrl } = response.data;
          setCourse(course);
          setLessons(lessons);
          setQuestions(questions);
          setEditableCourseName(course.title);
          setEditableCourseDescription(course.description);
          setEditableLessons(lessons);
          setEditableQuestions([...questions]);
          setCourseImage(imageUrl);
        } catch (error) {
          console.error("Error fetching course info", error);
        }
      }
    }

    fetchCourseInfo();
  }, []);

  const handleSaveCourseChanges = (values: any, actions: any) => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");
    axios
      .put(`${updateCourseDetailsAPI}/${courseId}`, values)
      .then((response) => {
        setCourse(response.data);
        setEditModeCourse(false);
        actions.setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error updating course details", error);
        actions.setSubmitting(false);
      });
  };

  function handleCancelCourseChanges() {
    setEditableCourseName(course ? course.title : "");
    setEditableCourseDescription(course ? course.description : "");
    setEditModeCourse(false);
  }

  function handleCancelLessonsChanges() {
    setEditableLessons([...lessons]);
    setEditModeLessons(false);
  }

  function handleLessonTitleChange(index: number, title: string) {
    const updatedLessons = editableLessons.map((lesson, lessonIndex) => {
      if (index === lessonIndex) {
        return { ...lesson, title };
      }
      return lesson;
    });
    setEditableLessons(updatedLessons);
  }

  function handleLessonContentChange(index: number, content: string) {
    const updatedLessons = editableLessons.map((lesson, lessonIndex) => {
      if (index === lessonIndex) {
        return { ...lesson, content };
      }
      return lesson;
    });
    setEditableLessons(updatedLessons);
  }

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = editableQuestions.map(
      (question, questionIndex) => {
        if (index === questionIndex) {
          return { ...question, [field]: value };
        }
        return question;
      }
    );
    setEditableQuestions(updatedQuestions);
  };

  const handleSaveQuestionsChanges = async () => {
    for (const question of editableQuestions) {
      await axios.put(`${updateQuestionAPI}/${question._id}`, {
        question_text: question.question_text,
        correct_answer: question.correct_answer,
        options: question.options,
        concept: question.concept, // Ensure the concept is updated
      });
    }
    setEditModeQuestions(false);
    // Consider refetching updated questions or updating local state as needed
  };

  const handleCancelQuestionsChanges = () => {
    setEditableQuestions([...questions]);
    setEditModeQuestions(false);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gpt_edtech360");

    setIsUploading(true);

    try {
      const response = await fetch(CloudinaryUploadAPI, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setCourseImage(data.url);

      await updateCourseImageOnBackend(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Assuming imageUrl should be a string, explicitly type it.
  const updateCourseImageOnBackend = async (
    imageUrl: string
  ): Promise<void> => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");
    if (!courseId) return;

    try {
      const response = await axios.post(updateCourseImageAPI, {
        courseId,
        imageUrl,
      });
      console.log("Course image updated successfully", response.data);
    } catch (error: any) {
      // Catching error as any temporarily
      // Proper error handling
      if (axios.isAxiosError(error)) {
        // Now we know it's an AxiosError, we can access response safely
        console.error("Error updating course image:", error.response?.data);
      } else {
        // Handle case where error is not from Axios
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleSaveLessonsChanges = async (
    lessons: lesson_type[],
    actions: FormikHelpers<{ lessons: lesson_type[] }>
  ) => {
    try {
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
      <div style={{ width: "70%" }} className="mx-auto shadow p-3 border rounded">
      {/* Course Details Editing */}
      {course && (
        <div  className="mx-auto">
          <Card border="primary" className="mt-2 mb-2">
            <Card.Body>
              <Card.Title className="display-6 text-center fw-bold text-primary">
                Course Details
              </Card.Title>
              {editModeCourse ? (
                <Formik
                  initialValues={{
                    title: course.title,
                    description: course.description,
                  }}
                  validationSchema={courseValidationSchema}
                  onSubmit={handleSaveCourseChanges}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Field name="title" className="form-control mb-2" />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-danger"
                      />
                      <Field
                        as="textarea"
                        name="description"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-danger"
                      />
                      <div className="d-flex justify-content-center mt-3">
                        <button
                          type="submit"
                          className="btn btn-success me-2"
                          disabled={isSubmitting}
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCancelCourseChanges}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <>
                  <h5>{course.title}</h5>
                  <p>{course.description}</p>
                  <div className="text-center mt-3 mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => setEditModeCourse(true)}
                    >
                      Edit Course Details
                    </button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      )}

      {/*  Image Section  */}
      <Card
        border="primary"
        className="mx-auto mt-3 mb-3"
       
      >
        <Card.Body>
          <Card.Title className="display-6 text-center fw-bold text-primary">
            Course Image
          </Card.Title>
          {/* Existing Course Image Display */}
          {courseImage && (
            <div className="text-center mb-3">
              <img
                src={courseImage}
                alt="Current Course"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="courseImage" className="form-label">
              Upload New Course Image
            </label>
            <input
              type="file"
              className="form-control"
              id="courseImage"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            {isUploading && <Spinner animation="border" />}
          </div>
        </Card.Body>
      </Card>

      {/* Lessons Editing Interface */}
      <div  className="mx-auto border rounded border-primary p-3">
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
                      (
                        lesson: lesson_type,
                        index: number // Ensure 'lesson' and 'index' are properly typed
                      ) => (
                        <div key={index} className="card mb-3">
                          <div className="card-body">
                            <h5 className="card-title">
                              Lesson {index + 1}
                            </h5>
                            <Field
                              name={`lessons.${index}.title`}
                              placeholder="Title"
                              type="text"
                              className="form-control mb-2" // Add mb-2 for margin bottom to the title field
                              style={{ marginBottom: '10px' }} // Alternatively, you can use inline styles for specific margin values
                            />
                            <ErrorMessage
                              name={`lessons.${index}.title`}
                              component="div"
                              className="text-danger" // Apply red color style
                            />
                            <Field
                              name={`lessons.${index}.content`}
                              placeholder="Content"
                              as="textarea"
                              className="form-control mb-2" // Add mb-2 for margin bottom to the content field
                              style={{ marginBottom: '10px', marginTop: '10px' }} // Adding margin top and bottom for spacing around the content field
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
                className="btn btn-secondary"
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
                  <Card.Title>Lesson {index + 1}</Card.Title>
                  <Card.Text>Title: {lesson.title}</Card.Text>
                  <Card.Text>Content: {lesson.content}</Card.Text>
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
      </div>

      {/* Quiz Questions Editing Interface */}
      <div  className="mx-auto">
        <h3 className="display-4 text-center fw-bold mt-4 text-primary">
          Quiz Questions
        </h3>
        {editableQuestions.map((question, index) => (
          <Card key={question._id} className="mt-2 mb-2 border border-primary">
            <Card.Body>
              {editModeQuestions ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Question Text"
                    value={question.question_text}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "question_text",
                        e.target.value
                      )
                    }
                  />
                  {question.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      type="text"
                      className="form-control mb-2"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...question.options];
                        newOptions[optionIndex] = e.target.value;
                        handleQuestionChange(index, "options", newOptions);
                      }}
                    />
                  ))}
                  <select
                    className="form-select mb-2"
                    value={question.correct_answer}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "correct_answer",
                        parseInt(e.target.value)
                      )
                    }
                  >
                    <option value="0">Option 1</option>
                    <option value="1">Option 2</option>
                    <option value="2">Option 3</option>
                    <option value="3">Option 4</option>
                  </select>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Concept"
                    value={question.concept}
                    onChange={(e) =>
                      handleQuestionChange(index, "concept", e.target.value)
                    }
                  />
                </>
              ) : (
                <>
                  <p>{question.question_text}</p>
                  <ul>
                    {question.options.map((option, i) => (
                      <li key={i}>{option}</li>
                    ))}
                  </ul>
                  <p>
                    Correct Answer: {question.options[question.correct_answer]}
                  </p>
                  <p>Concept: {question.concept}</p>
                </>
              )}
            </Card.Body>
          </Card>
        ))}
        {editModeQuestions ? (
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-success me-2"
              onClick={handleSaveQuestionsChanges}
            >
              Save Questions
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleCancelQuestionsChanges}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="text-center mt-3 mb-3">
            <button
              className="btn btn-primary"
              onClick={() => setEditModeQuestions(true)}
            >
              Edit Questions
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default EditCourse;
