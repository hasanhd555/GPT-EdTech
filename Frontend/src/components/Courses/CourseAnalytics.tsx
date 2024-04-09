import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button, Card } from "react-bootstrap";
import { getCourseAnalyticsAPI } from "../../constant";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [graphData, setGraphData] = useState<GraphData>({ labels: [], datasets: [] });
  const [graphMode, setGraphMode] = useState<GraphMode>("aggregate");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    async function fetchCourseAnalytics() {
      if (courseId) {
        try {
          const response = await axios.get(`${getCourseAnalyticsAPI}?courseId=${courseId}`);
          const data = response.data.analytics;
          setAnalytics(data);
        } catch (error) {
          console.error("Error fetching course analytics", error);
        }
      }
    }

    fetchCourseAnalytics();
  }, []);

  useEffect(() => {
    if (analytics.length === 0) {
        setGraphData({ labels: [], datasets: [] }); // Clear previous graph data if no analytics data
        return; // Exit if there are no analytics data
      }

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

      const labels = Object.keys(marksDistribution).map(Number).sort((a, b) => a - b);
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
      <div>
        <h2 className="display-5 text-center fw-bold">Course Analytics</h2>
      </div>
      
      {analytics.length > 0 ? (
        <>
        <div className="d-flex justify-content-center mb-4">
        <Button variant="secondary" onClick={() => setGraphMode(graphMode === "individual" ? "aggregate" : "individual")}>
          Switch to {graphMode === "aggregate" ? "Individual View" : "Aggregate View"}
        </Button>
      </div>
        <div style={{ height: "400px" }}>
          <Bar data={graphData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        </>
      ) : (
        <Card className="text-center">
          <Card.Body>
            <Card.Text>No data available for this course. No enrollments.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default CourseAnalytics;
