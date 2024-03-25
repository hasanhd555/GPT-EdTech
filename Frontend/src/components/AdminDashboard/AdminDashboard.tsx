import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./AdminDashboard.scss";
import { useNavigate } from "react-router";
import ExploreCourses from "../ExploreCourses/ExploreCourses";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAddCourseClick = () => {
    navigate('/add-course');
  };

  const handleEditCourseClick = () => {
    navigate('/editable-course');
  };
  return (
    <div>
      <div>
        <h2 className="display-5 text-center fw-bold">
          Welcome to your Dashboard
        </h2>
      </div>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <Button onClick={handleAddCourseClick} className="width-5em mb-2 me-2" variant="primary" size="lg">
          Add a New Course
        </Button>
      </div>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <Button onClick={handleEditCourseClick} className="width-5em mb-2 me-2" variant="primary" size="lg">
          Edit a Course
        </Button>
      </div>

      <ExploreCourses title="All Courses"/>
      
    </div>
  );
};

export default AdminDashboard;
