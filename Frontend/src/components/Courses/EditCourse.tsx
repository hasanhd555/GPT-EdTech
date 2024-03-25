import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { getCourseAllInfoAPI,updateCourseDetailsAPI } from "../../constant"; // Assuming you have this constant
import { course_type, lesson_type, question_type } from "../../constant";

function EditCourse() {
  const [course, setCourse] = useState<course_type | null>(null);
  const [lessons, setLessons] = useState<lesson_type[]>([]);
  const [questions, setQuestions] = useState<question_type[]>([]);

  const [editMode, setEditMode] = useState(false);
  const [editableCourseName, setEditableCourseName] = useState('');
  const [editableCourseDescription, setEditableCourseDescription] = useState('');
  

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get("id");

    const fetchCourseInfo = async () => {
      if (course_id) {
        try {
          const response = await axios.get(
            `${getCourseAllInfoAPI}?courseId=${course_id}`
          );
          const { course, lessons, questions } = response.data;
          setCourse(course);
          setLessons(lessons);
          setQuestions(questions);
          // Inside the fetchCourseInfo success response
            setEditableCourseName(course.title);
            setEditableCourseDescription(course.description);

        } catch (error) {
          console.error("Error fetching course info", error);
        }
      }
    };

    fetchCourseInfo();
  }, []);

  const handleSaveChanges = async () => {
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get("id");
    try {
      // Replace `updateCourseAPI` with your actual update API endpoint
      await axios.put(`${updateCourseDetailsAPI}/${course_id}`, {
        title: editableCourseName,
        description: editableCourseDescription,
      });
      // Update the course state and exit edit mode
      if (course) {
        setCourse({ ...course, title: editableCourseName, description: editableCourseDescription });
      }
      setEditMode(false);
      // Optionally, show a success message
    } catch (error) {
      console.error("Error updating course", error);
      // Optionally, show an error message
    }
  };
  
  const handleCancelChanges = () => {
    // Reset editable fields to the current course state
    setEditableCourseName(course ? course.title : '');
    setEditableCourseDescription(course ? course.description : '');
    setEditMode(false);
  };
  

  return (
    <div className="mt-2 mb-3">
      <div>
        <h2 className="display-5 text-center fw-bold">Edit Course</h2>
      </div>
      {course && (
  <div style={{ width: "70%" }} className="mx-auto">
    <Card border="primary" className="mt-2 mb-2">
      <Card.Body>
        <Card.Title className="display-6 text-center fw-bold text-primary">
          Course Details
        </Card.Title>
        <hr />
        <div className="mb-3">
          <h4>Course Name:</h4>
          {editMode ? (
            <input
              type="text"
              className="form-control"
              value={editableCourseName}
              onChange={(e) => setEditableCourseName(e.target.value)}
            />
          ) : (
            <h5>{editableCourseName}</h5>
          )}
        </div>
        <hr />
        <div>
          <h4>Course Description:</h4>
          {editMode ? (
            <textarea
              className="form-control"
              value={editableCourseDescription}
              onChange={(e) => setEditableCourseDescription(e.target.value)}
            ></textarea>
          ) : (
            <p>{editableCourseDescription}</p>
          )}
        </div>
        {editMode && (
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-success me-2" onClick={handleSaveChanges}>Save</button>
            <button className="btn btn-secondary" onClick={handleCancelChanges}>Cancel</button>
          </div>
        )}
      </Card.Body>
    {!editMode && (
        <div className="text-center mt-3 mb-3">
        <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Course Details</button>
      </div>
    )}
    </Card>
  </div>
)}


      <div style={{ width: "70%" }} className="mx-auto">
        <h3 className="display-4 text-center fw-bold mt-4 text-primary">
          Lessons Section
        </h3>
        {lessons.map((lesson, index) => (
          <Card key={lesson._id} className="mt-2 mb-2 border border-primary">
            <Card.Body>
              <Card.Title className="display-6">
                Lesson {index + 1}: {lesson.title}
              </Card.Title>
              <Card.Text>{lesson.content}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div style={{ width: "70%" }} className="mx-auto">
        <h3 className="display-4 text-center fw-bold mt-4 text-primary">
          Quiz Section
        </h3>
        {questions.map((question, index) => (
          <Card key={index} className="mt-2 mb-2 border border-primary">
            <Card.Body>
              <Card.Title className="display-6">
                Question {index + 1}: {question.question_text}
              </Card.Title>
              <ul>
                {question.options.map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
              <Card.Text>
                Correct Answer: {question.options[question.correct_answer]}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default EditCourse;
