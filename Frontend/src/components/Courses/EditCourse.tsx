import { useEffect, useState } from "react";
import axios from "axios";
import { getCourseAllInfoAPI } from "../../constant"; // Assuming you have this constant
import { course_type, lesson_type, question_type } from "../../constant";

function EditCourse() {
  const [course, setCourse] = useState<course_type | null>(null);
  const [lessons, setLessons] = useState<lesson_type[]>([]);
  const [questions, setQuestions] = useState<question_type[]>([]);

  useEffect(() => {
    // Extracting id from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const fetchCourseInfo = async () => {
      if (id) {
        try {
          const response = await axios.get(`${getCourseAllInfoAPI}?courseId=${id}`); // Make sure to update the API endpoint as needed
          const { course, lessons, questions } = response.data;
          setCourse(course);
          setLessons(lessons);
          setQuestions(questions);
        } catch (error) {
          console.error("Error fetching course info", error);
        }
      }
    };

    fetchCourseInfo();
  }, []);

  return (
    <div>
      <h1>Edit Course</h1>
      {course && (
        <div>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          {/* <img src={course.image_url} alt="Course" /> */}
        </div>
      )}

      <h3>Lessons</h3>
      {lessons.map((lesson, index) => (
        <div key={lesson._id}>
          <h4>Lesson {index + 1}: {lesson.title}</h4>
          <p>{lesson.content}</p>
        </div>
      ))}

      <h3>Quiz Questions</h3>
      {questions.map((question, index) => (
        <div key={index}>
          <h4>Question {index + 1}: {question.question_text}</h4>
          <ul>
            {question.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>
          <p>Correct Answer: {question.options[question.correct_answer]}</p>
        </div>
      ))}
    </div>
  );
}

export default EditCourse;
