import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks"; // Import to access Redux state
import { NavigateFunction, useNavigate } from "react-router"; // Import navigation functions from react-router
import EditCourseDetails from "./Edit Components/EditCourseDetails"; // Import component for editing course details
import EditCourseImage from "./Edit Components/EditCourseImage"; // Import component for editing course image
import LessonsEditComponent from "./Edit Components/LessonsEditComponent"; // Import component for editing lessons
import QuizQuestionsEditComponent from "./Edit Components/QuizQuestionsEditComponent"; // Import component for editing quiz questions

function EditCourse() {
  const [courseId, setCourseId] = useState(""); // State to hold the current course ID
  const navigate: NavigateFunction = useNavigate(); // Hook to programmatically navigate
  const { isAdmin, email, _id } = useAppSelector((state) => state.User); // Destructure and access user properties from Redux store

  useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // Redirect non-admin users to the home page
    }
    const params = new URLSearchParams(window.location.search); // Access URL search parameters
    const courseId = params.get("id"); // Get the course ID from URL parameters
    if (courseId) {
      setCourseId(courseId); // Set the course ID state if it exists
    }
  }, []);

  return (
    <div className="mt-2 mb-3">
      <div>
        <h2 className="display-5 text-center fw-bold">Edit Course</h2> 
        {/* // Header displaying the purpose of the page */}
      </div>
      <div
        style={{ width: "70%" }}
        className="mx-auto shadow p-3 border rounded" // Styling for the container
      >
        <EditCourseDetails courseId={courseId} /> 
        {/* // Component to edit course details, passing the current course ID */}

        <EditCourseImage courseId={courseId} /> 
        {/* // Component to edit course image, passing the current course ID */}

        <LessonsEditComponent courseId={courseId} /> 
        {/* // Component to edit lessons, passing the current course ID */}

        <QuizQuestionsEditComponent courseId={courseId} /> 
        {/* // Component to edit quiz questions, passing the current course ID */}
      </div>
    </div>
  );
}

export default EditCourse; // Export the component for use in other parts of the application
