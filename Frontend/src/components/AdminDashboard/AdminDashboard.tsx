import React, { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import StudentCard from "../StudentCard/StudentCard";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks";
import Button from "react-bootstrap/Button";
import "./AdminDashboard.scss";
import { NavigateFunction, useNavigate } from "react-router";
import ExploreCourses from "../ExploreCourses/ExploreCourses";

const AdminDashboard = () => {
    const navigate: NavigateFunction = useNavigate();
  return (
    <div className="">
      <div>
        <h2 className="display-5 text-center fw-bold">
          Welcome to your Dashboard
        </h2>
      </div>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <Button className="width-5em mb-2 me-2" variant="primary" size="lg">
          Add a New Course
        </Button>
      </div>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <Button className="width-5em mb-2 me-2" variant="primary" size="lg">
          Edit a Course
        </Button>
      </div>

      <ExploreCourses title="All Courses"/>
      
    </div>
  );
};

export default AdminDashboard;
