import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Card from "react-bootstrap/Card";
import { getCourseAnalyticsAPI } from "../../constant";

// Extend the ChartData type for stricter typing (optional)
import { ChartData } from 'chart.js';

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

function CourseAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [graphData, setGraphData] = useState<ChartData<"bar", (number | null)[], string>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    async function fetchCourseAnalytics() {
      if (courseId) {
        try {
          const response = await axios.get(`${getCourseAnalyticsAPI}?courseId=${courseId}`);
          const data = response.data.analytics;
          if (data && data.length > 0) {
            setAnalytics(data);
      
            const sortedData = data.sort((a: AnalyticsData, b: AnalyticsData) => b.points - a.points);
            
            // Add explicit types to the parameters in the map functions
            const labels = sortedData.map((item: AnalyticsData, index: number) => `Rank ${index + 1}: ${item.studentName}`);
            const points = sortedData.map((item: AnalyticsData) => item.points);
      
            setGraphData({
              labels,
              datasets: [{
                label: 'Student Points',
                data: points,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              }],
            });
          } else {
            // alert("No enrollments for this course yet.");
          }
        } catch (error) {
          console.error("Error fetching course analytics", error);
        }
      }
    }

    fetchCourseAnalytics();
  }, []);

  return (
    <div className="mt-2 mb-3">
      <div>
        <h2 className="display-5 text-center fw-bold">Course Analytics</h2>
      </div>
      {analytics.length > 0 ? (
        <>
          <Card className="mb-3 shadow-sm"> {/* Added shadow for depth */}
  <Card.Header className="bg-primary text-white text-center">
    Total Students Enrolled: {analytics.length}
  </Card.Header>
  <Card.Body>
    <Card.Title className="text-center mb-4">Course Analytics</Card.Title>
    <Card.Text className="text-success d-flex justify-content-between align-items-center">
      <span>Highest Marks:</span>
      <strong>{Math.max(...analytics.map(a => a.points), 0)}</strong>
    </Card.Text>
    <Card.Text className="text-danger d-flex justify-content-between align-items-center">
      <span>Lowest Marks:</span>
      <strong>{Math.min(...analytics.map(a => a.points), 0)}</strong>
    </Card.Text>
  </Card.Body>
</Card>

          <div style={{ height: '15em' }}> {/* Adjust the height as needed */}
  <Bar
    data={{
      ...graphData,
      datasets: graphData.datasets.map(dataset => ({
        ...dataset,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      })),
    }}
    options={{
      responsive: true,
      maintainAspectRatio: false, // This is important to respect the container's height
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Student Points Distribution',
        },
      },
    }}
  />
</div>


        </>
      ) : (
        <Card className="text-center ">
          <Card.Body>
            <Card.Text className="text-muted">No data available for this course. No enrollment.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default CourseAnalytics;
