import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./AdminDashboard.scss";
import { useNavigate } from "react-router";
import ExploreCourses from "../ExploreCourses/ExploreCourses";
import AdminDashboardCourses from "../Admin Courses/AdminDashboardCourses";

const AdminDashboard = () => {
  const navigate = useNavigate(); // Hook for navigating programmatically

  // Function to navigate to the Add Course page
  const handleAddCourseClick = () => {
    navigate('/add-course');
  };

  // Function to navigate to the Edit Course page
  const handleEditCourseClick = () => {
    navigate('/editable-course');
  };

  // Function to navigate to the Course Analytics page
  const handleAllCourseAnalyticsClick = () => {
    navigate('/all-course-analytics');
  };
  return (
    <div>
      <div>
        {/* Dashboard heading */}
        <h2 className="display-5 text-center fw-bold my-5">
          Admin Dashboard
        </h2>
      </div>
      <div className="d-flex justify-content-center mt-3 mb-3">
        {/* Button to add a new course */}
        <Button onClick={handleAddCourseClick} className="width-5em mb-2 me-2" variant="primary" size="lg">
          Add a New Course
        </Button>
      </div>

      <AdminDashboardCourses />
      
    </div>
  );
};

export default AdminDashboard;
