import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {
  getCourseAllInfoAPI,
  updateCourseDetailsAPI,
  updateLessonAPI,updateQuestionAPI,
} from "../../constant"; // Assuming you have this constant
import { course_type, lesson_type, question_type } from "../../constant";

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
  const [editableQuestions, setEditableQuestions] = useState<question_type[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    async function fetchCourseInfo() {
      if (courseId) {
        try {
          const response = await axios.get(
            `${getCourseAllInfoAPI}?courseId=${courseId}`
          );
          const { course, lessons, questions } = response.data;
          setCourse(course);
          setLessons(lessons);
          setQuestions(questions);
          setEditableCourseName(course.title);
          setEditableCourseDescription(course.description);
          setEditableLessons(lessons);
          setEditableQuestions([...questions]);
        } catch (error) {
          console.error("Error fetching course info", error);
        }
      }
    }

    fetchCourseInfo();
  }, []);

  async function handleSaveCourseChanges() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    try {
      const params = new URLSearchParams(window.location.search);
      const courseId = params.get("id");
      await axios.put(`${updateCourseDetailsAPI}/${courseId}`, {
        title: editableCourseName,
        description: editableCourseDescription,
      });

      // Refetch course info to update local state with the new changes
      const response = await axios.get(
        `${getCourseAllInfoAPI}?courseId=${courseId}`
      );
      const { course, lessons, questions } = response.data;
      setCourse(course);
      setEditableCourseName(course.title);
      setEditableCourseDescription(course.description);
      setEditModeCourse(false);
    } catch (error) {
      console.error("Error updating course details", error);
    }
  }

  async function handleSaveLessonsChanges() {
    try {
      const params = new URLSearchParams(window.location.search);
      const courseId = params.get("id");
      for (const lesson of editableLessons) {
        await axios.put(`${updateLessonAPI}/${lesson._id}`, {
          title: lesson.title,
          content: lesson.content,
        });
      }

      // After all lessons are updated, refetch course info
      const response = await axios.get(
        `${getCourseAllInfoAPI}?courseId=${courseId}`
      );
      const { course, lessons, questions } = response.data;

      setLessons(lessons); // Update lessons with the newly fetched data

      setEditableLessons(lessons); // Update editable lessons with the latest data
      setEditModeLessons(false);
    } catch (error) {
      console.error("Error updating lessons", error);
    }
  }

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
    const updatedQuestions = editableQuestions.map((question, questionIndex) => {
      if (index === questionIndex) {
        return { ...question, [field]: value };
      }
      return question;
    });
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

  return (
    <div className="mt-2 mb-3">
      <div>
        <h2 className="display-5 text-center fw-bold">Edit Course</h2>
      </div>
      {/* Course Details Editing */}
      {course && (
        <div style={{ width: "70%" }} className="mx-auto">
          <Card border="primary" className="mt-2 mb-2">
            <Card.Body>
              <Card.Title className="display-6 text-center fw-bold text-primary">
                Course Details
              </Card.Title>
              {editModeCourse ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editableCourseName}
                    onChange={(e) => setEditableCourseName(e.target.value)}
                  />
                  <textarea
                    className="form-control"
                    value={editableCourseDescription}
                    onChange={(e) =>
                      setEditableCourseDescription(e.target.value)
                    }
                  ></textarea>
                </>
              ) : (
                <>
                  <h5>{course.title}</h5>
                  <p>{course.description}</p>
                </>
              )}
            </Card.Body>
          </Card>
          {editModeCourse ? (
            <>
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-success me-2"
                  onClick={handleSaveCourseChanges}
                >
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelCourseChanges}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
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
        </div>
      )}

      {/* Lessons Editing Interface */}
      <div style={{ width: "70%" }} className="mx-auto">
        <h3 className="display-4 text-center fw-bold mt-4 text-primary">
          Lessons
        </h3>
        {editableLessons.map((lesson, index) => (
          <Card key={lesson._id} className="mt-2 mb-2 border border-primary">
            <Card.Body>
              <h5>Lesson {index + 1}</h5>
              {editModeLessons ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={lesson.title}
                    onChange={(e) =>
                      handleLessonTitleChange(index, e.target.value)
                    }
                  />
                  <textarea
                    className="form-control"
                    value={lesson.content}
                    onChange={(e) =>
                      handleLessonContentChange(index, e.target.value)
                    }
                  ></textarea>
                </>
              ) : (
                <>
                  <h5>{lesson.title}</h5>
                  <p>{lesson.content}</p>
                </>
              )}
            </Card.Body>
          </Card>
        ))}
        {editModeLessons && (
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-success me-2"
              onClick={handleSaveLessonsChanges}
            >
              Save Lessons
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleCancelLessonsChanges}
            >
              Cancel
            </button>
          </div>
        )}
        {!editModeLessons && (
          <div className="text-center mt-3 mb-3">
            <button
              className="btn btn-primary"
              onClick={() => setEditModeLessons(true)}
            >
              Edit Lessons
            </button>
          </div>
        )}
      </div>

      {/* Quiz Questions Editing Interface */}
      <div style={{ width: "70%" }} className="mx-auto">
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
                    onChange={(e) => handleQuestionChange(index, 'question_text', e.target.value)}
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
                        handleQuestionChange(index, 'options', newOptions);
                      }}
                    />
                  ))}
                  <select
                    className="form-select mb-2"
                    value={question.correct_answer}
                    onChange={(e) => handleQuestionChange(index, 'correct_answer', parseInt(e.target.value))}
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
                    onChange={(e) => handleQuestionChange(index, 'concept', e.target.value)}
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
                  <p>Correct Answer: {question.options[question.correct_answer]}</p>
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
            <button              className="btn btn-primary"
              onClick={() => setEditModeQuestions(true)}
            >
              Edit Questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditCourse;

