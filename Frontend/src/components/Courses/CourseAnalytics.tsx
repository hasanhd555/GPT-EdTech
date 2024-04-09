import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {
  getCourseAnalyticsAPI, 
} from "../../constant"; // Assuming you have this constant
import { course_type, lesson_type, question_type } from "../../constant";

function CourseAnalytics() { 
  


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    async function fetchCourseInfo() {
      if (courseId) {
        try {
          const response = await axios.get(
            `${getCourseAnalyticsAPI}?courseId=${courseId}`
          );
          
        } catch (error) {
          console.error("Error fetching course info", error);
        }
      }
    }

    fetchCourseInfo();
  }, []);

  

  return (
    <div className="mt-2 mb-3">
      <div>
        <h2 className="display-5 text-center fw-bold">Course Analytics</h2>
      </div>
      
    </div>
  );
}

export default CourseAnalytics;

