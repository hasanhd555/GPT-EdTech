// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button"; // Import Button from React Bootstrap
// import { getCourseAnalyticsAPI } from "../../constant";

// // Extend the ChartData type for stricter typing (optional)
// import { ChartData } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface AnalyticsData {
//   studentName: string;
//   points: number;
// }

// // Define a type for the graph mode
// type GraphMode = "individual" | "aggregate";

// function CourseAnalytics() {
//   const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
//   const [graphData, setGraphData] = useState<
//     ChartData<"bar", (number | null)[], string>
//   >({ labels: [], datasets: [] });
//   const [graphMode, setGraphMode] = useState<GraphMode>("individual"); // New state to track the graph mode

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const courseId = params.get("id");

//     async function fetchCourseAnalytics() {
//       if (courseId) {
//         try {
//           const response = await axios.get(
//             `${getCourseAnalyticsAPI}?courseId=${courseId}`
//           );
//           const data = response.data.analytics;
//           if (data && data.length > 0) {
//             setAnalytics(data);

//             const sortedData = data.sort(
//               (a: AnalyticsData, b: AnalyticsData) => b.points - a.points
//             );

//             // Add explicit types to the parameters in the map functions
//             const labels = sortedData.map(
//               (item: AnalyticsData, index: number) =>
//                 `Rank ${index + 1}: ${item.studentName}`
//             );
//             const points = sortedData.map((item: AnalyticsData) => item.points);

//             setGraphData({
//               labels,
//               datasets: [
//                 {
//                   label: "Student Points",
//                   data: points,
//                   backgroundColor: "rgba(53, 162, 235, 0.5)",
//                 },
//               ],
//             });
//           } else {
//             // alert("No enrollments for this course yet.");
//           }
//         } catch (error) {
//           console.error("Error fetching course analytics", error);
//         }
//       }
//     }

//     fetchCourseAnalytics();
//   }, []);

//   useEffect(() => {
//     // This effect updates the graph data whenever analytics data or graphMode changes
//     if (analytics.length > 0) {
//       if (graphMode === "individual") {
//         // Your existing code to set graph data for individual student points
//       } else {
//         // Aggregate graph data logic
//         const marksDistribution = analytics.reduce((acc, { points }) => {
//           acc[points] = (acc[points] || 0) + 1;
//           return acc;
//         }, {});

//         const labels = Object.keys(marksDistribution)
//           .map(Number)
//           .sort((a, b) => a - b);
//         const data = labels.map((label) => marksDistribution[label]);

//         setGraphData({
//           labels: labels.map((label) => label.toString()),
//           datasets: [
//             {
//               label: "Number of Students",
//               data,
//               backgroundColor: "rgba(255, 99, 132, 0.5)",
//             },
//           ],
//         });
//       }
//     }
//   }, [analytics, graphMode]);

//   const handleToggleGraphMode = () => {
//     setGraphMode((prevMode) =>
//       prevMode === "individual" ? "aggregate" : "individual"
//     );
//   };

//   return (
//     <div className="mt-2 mb-3">
//       <div>
//         <h2 className="display-5 text-center fw-bold">Course Analytics</h2>
//       </div>
//       {analytics.length > 0 ? (
//         <>
//           <Card className="mb-3 shadow-sm">
//             {" "}
//             {/* Added shadow for depth */}
//             <Card.Header className="bg-primary text-white text-center">
//               Total Students Enrolled: {analytics.length}
//             </Card.Header>
//             <Card.Body>
//               <Card.Title className="text-center mb-4">
//                 Course Analytics
//               </Card.Title>
//               <Card.Text className="text-success d-flex justify-content-between align-items-center">
//                 <span>Highest Marks:</span>
//                 <strong>
//                   {Math.max(...analytics.map((a) => a.points), 0)}
//                 </strong>
//               </Card.Text>
//               <Card.Text className="text-danger d-flex justify-content-between align-items-center">
//                 <span>Lowest Marks:</span>
//                 <strong>
//                   {Math.min(...analytics.map((a) => a.points), 0)}
//                 </strong>
//               </Card.Text>
//             </Card.Body>
//           </Card>

//           <div style={{ height: "15em" }}>
//             {" "}
//             {/* Adjust the height as needed */}
//             <Bar
//               data={{
//                 ...graphData,
//                 datasets: graphData.datasets.map((dataset) => ({
//                   ...dataset,
//                   barPercentage: 0.5,
//                   categoryPercentage: 0.5,
//                 })),
//               }}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false, // This is important to respect the container's height
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                   },
//                 },
//                 plugins: {
//                   legend: {
//                     position: "top",
//                   },
//                   title: {
//                     display: true,
//                     text: "Student Points Distribution",
//                   },
//                 },
//               }}
//             />
//           </div>
//         </>
//       ) : (
//         <Card className="text-center ">
//           <Card.Body>
//             <Card.Text className="text-muted">
//               No data available for this course. No enrollment.
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       )}
//       <Button onClick={handleToggleGraphMode} className="mb-3">
//         Switch to{" "}
//         {graphMode === "individual" ? "Aggregate Marks" : "Individual Marks"}{" "}
//         Graph
//       </Button>
//       <div style={{ height: "20em" }}>
//         <Bar
//           data={graphData}
//           options={{ responsive: true, maintainAspectRatio: false }}
//         />
//       </div>
//     </div>
//   );
// }

// export default CourseAnalytics;

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
