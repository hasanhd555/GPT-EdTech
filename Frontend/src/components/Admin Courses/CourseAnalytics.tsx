import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2"; // Bar graph component from Chart.j
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Core Chart.js components
import { Button, Card } from "react-bootstrap"; // Bootstrap components for UI
import { getCourseAnalyticsAPI } from "../../constant"; // API endpoint
import { useAppSelector } from "../../redux/hooks"; // Redux hook to access the store
import { NavigateFunction, useNavigate } from "react-router"; // Hook for navigation

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// TypeScript interface for the analytics data structure
interface AnalyticsData {
  studentName: string;
  points: number;
}

// Define a type for the graph mode
type GraphMode = "individual" | "aggregate";

// Define a type for the graph data
interface GraphData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
  }>;
}

function CourseAnalytics() {
  // State for storing analytics data
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  // State for configuring the graph
  const [graphData, setGraphData] = useState<GraphData>({
    labels: [],
    datasets: [],
  });
  // State to toggle between individual and aggregate data views
  const [graphMode, setGraphMode] = useState<GraphMode>("aggregate");
  const navigate: NavigateFunction = useNavigate(); // Hook for programmatic navigation
  // Extracting user details from the Redux store
  const { isAdmin, email, _id } = useAppSelector((state) => state.User); // Destructuring user details from Redux store

  // Effect hook to fetch analytics data
  useEffect(() => {
    // Redirect non-admin users to home page
    if (!isAdmin) {
      navigate("/");
    }
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    // Function to fetch course analytics data from the server
    async function fetchCourseAnalytics() {
      if (courseId) {
        try {
          const response = await axios.get(
            `${getCourseAnalyticsAPI}?courseId=${courseId}`
          );
          const data = response.data.analytics;
          setAnalytics(data); // Setting the fetched data to state
        } catch (error) {
          console.error("Error fetching course analytics", error);
        }
      }
    }

    fetchCourseAnalytics();
  }, []);

  // Effect hook to prepare data for the graph based on current analytics data
  useEffect(() => {
    if (analytics.length === 0) {
      setGraphData({ labels: [], datasets: [] }); // Clear previous graph data if no analytics data
      return; // Exit if there are no analytics data
    }

    // Configuring graph data for individual mode
    if (graphMode === "individual") {
      const labels = analytics.map((_, index) => `Student ${index + 1}`);
      const data = analytics.map((item) => item.points);

      setGraphData({
        labels,
        datasets: [
          {
            label: "Points",
            data,
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    } else {
      // Calculate the distribution of marks
      const marksDistribution: { [key: string]: number } = {};
      analytics.forEach(({ points }) => {
        marksDistribution[points] = (marksDistribution[points] || 0) + 1;
      });

      const labels = Object.keys(marksDistribution)
        .map(Number)
        .sort((a, b) => a - b);
      const data = labels.map((label) => marksDistribution[label]);

      setGraphData({
        labels: labels.map(String),
        datasets: [
          {
            label: "Number of Students",
            data,
            // backgroundColor: "rgba(255, 99, 132, 0.5)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    }
  }, [analytics, graphMode]);

  return (
    <div className="mt-2 mb-3">
      {/* Page Title  */}
      <div>
        <h2 className="display-5 text-center fw-bold">Course Analytics</h2>
      </div>

      {/* Conditional rendering based on the availability of analytics data */}
      {analytics.length > 0 ? (
        <>
          <div className="d-flex justify-content-center mb-4">
            <Button
              variant="secondary"
              onClick={() =>
                setGraphMode(
                  graphMode === "individual" ? "aggregate" : "individual"
                )
              }
            >
              Switch to{" "}
              {graphMode === "aggregate" ? "Individual View" : "Aggregate View"}
            </Button>
          </div>
          <div style={{ height: "400px" }}>
            <Bar
              data={graphData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </>
      ) : (
        
        <Card className="text-center" data-testid="no-enrollments-message">
          <Card.Body>
            <Card.Text>
              No data available for this course. No enrollments.
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default CourseAnalytics;
