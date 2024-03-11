import React, { useState, FormEvent } from "react";
import Card from "react-bootstrap/Card";

interface Lesson {
  title: string;
  content: string;
}

const AddCourse: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const addLesson = () => {
    setLessons((lessons) => [...lessons, { title: "", content: "" }]);
  };

  const handleLessonChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setLessons((lessons) =>
      lessons.map((lesson, i) =>
        i === index ? { ...lesson, [name]: value } : lesson
      )
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Process submission here
    console.log("Course and lessons submitted: ", lessons);
  };

  return (
    <div className="mt-2 mb-3">
      <div>
        <h2 className="display-5 text-center fw-bold">
          Welcome to Add a new course page
        </h2>
      </div>
      <div style={{ width: "70%" }} className="mx-auto">
        <form onSubmit={handleSubmit}>
          <Card border="primary" className="mt-2 mb-2">
            <Card.Body>
              <Card.Title className="display-6 text-center fw-bold">
                Course Details
              </Card.Title>

              {/* Add Course name and description form here */}
              <div className="mb-3">
                <label htmlFor="courseName" className="form-label fw-bold">
                  Course Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="courseName"
                  placeholder="Enter course name"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="courseDescription"
                  className="form-label fw-bold"
                >
                  Course Description
                </label>
                <textarea
                  className="form-control"
                  id="courseDescription"
                  rows={3}
                  placeholder="Enter course description"
                ></textarea>
              </div>
            </Card.Body>
          </Card>

          {/* Lesson forms */}
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="mt-2 mb-2 border border-primary border-1 rounded p-2"
            >
              <Card.Title className="display-6 text-center fw-bold">
                Lesson {index + 1} Details
              </Card.Title>
              <div className="mb-3">
                <label
                  htmlFor={`lessonTitle-${index}`}
                  className="form-label fw-bold"
                >
                  Lesson Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter lesson title"
                  value={lesson.title}
                  onChange={(e) => handleLessonChange(e, index)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor={`lessonContent-${index}`}
                  className="form-label fw-bold"
                >
                  Content
                </label>
                <textarea
                  className="form-control"
                  name="content"
                  rows={3}
                  placeholder="Enter lesson content"
                  value={lesson.content}
                  onChange={(e) => handleLessonChange(e, index)}
                ></textarea>
              </div>
            </div>
          ))}
          <div>
            {/* Add another lesson form  */}
            <button
              type="button"
              className="btn btn-primary mx-auto"
              onClick={addLesson}
            >
              Add New Lesson
            </button>
          </div>

          <div>
            <button type="submit" className="btn btn-primary mx-auto mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
