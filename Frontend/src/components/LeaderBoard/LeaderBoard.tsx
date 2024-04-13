import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import RankingItem from "../RankingItem/RankingItem";
import styles from "./LeaderBoard.module.css";
import {
  BronzeMedalImgUrl,
  GoldMedalImgUrl,
  SilverMedalImgUrl,
  getTotalPointsAPI,
  student_type,
} from "../../constant";

// Extending the student_type from constants with specific leaderboard properties
interface LeaderboardStudent extends student_type {
  totalPoints: number;
  studentUsername: string;
}

const Leaderboard: React.FC = () => {
  // State to store the array of students for the leaderboard
  const [students, setStudents] = useState<LeaderboardStudent[]>([]);

  useEffect(() => {
    // Function to fetch leaderboard data from the server
    const fetchLeaderboard = async () => {
      try {
        // Making a GET request to retrieve the leaderboard data
        const response = await axios.get<LeaderboardStudent[]>(getTotalPointsAPI);
        // Setting the state with fetched data, assuming the API sorts them by points
        setStudents(response.data);
      } catch (error) {
        // Logging errors if the API call fails
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard(); // Triggering the fetch operation when the component mounts
  }, []);

  // Mapping medals to corresponding URLs for easy access
  const medals = {
    gold: GoldMedalImgUrl,
    silver: SilverMedalImgUrl,
    bronze: BronzeMedalImgUrl,
  };

  return (
    <Container fluid style={{ backgroundColor: "#f7f7f8" }}>
      <Row className="pt-5">
        <Col className="text-center">
          <h1>Student</h1>
        </Col>
      </Row>
      <Row className="pb-4">
        <Col className="text-center">
          <h1>Leaderboard</h1>
        </Col>
      </Row>
      <Row>
        <Container
          className="pt-5 pb-5 px-5 mb-5"
          style={{ width: "75%", backgroundColor: "white" }}
        >
          {/* Displaying the top three students with special styling and medals */}
          <Row className="d-flex align-items-center mb-5">
            {/* Silver Medal (2nd place) */}
            {students[1] && (
              <Col xs={12} md={12} lg={4}>
                <div
                  className={`d-flex flex-column flex-lg-row justify-content-around align-items-center bg-primary rounded p-2 text-white ${styles.customBoxShadow} ${styles.rankingItem} ${styles.topThreeRanking}`}
                >
                  <img
                    src={medals.silver}
                    alt="Rank 2"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <div
                    className={`d-flex flex-grow-1 justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[1].studentUsername}
                  </div>
                  <div
                    className={`d-flex flex-grow-1 justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[1].totalPoints} score
                  </div>
                </div>
              </Col>
            )}
            {/* Gold Medal (1st place) */}
            {students[0] && (
              <Col xs={12} md={12} lg={4}>
                <div
                  className={`d-flex flex-column flex-lg-row justify-content-around align-items-center bg-primary rounded p-2 text-white ${styles.customBoxShadow} ${styles.rankingItem} ${styles.topThreeRanking}`}
                >
                  <img
                    src={medals.gold}
                    alt="Rank 1"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <div
                    className={`d-flex flex-grow-1 justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[0].studentUsername}
                  </div>
                  <div
                    className={`d-flex flex-grow-1 justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[0].totalPoints} score
                  </div>
                </div>
              </Col>
            )}
            {/* Bronze Medal (3rd place) */}
            {students[2] && (
              <Col xs={12} md={12} lg={4}>
                <div
                  className={`d-flex flex-column flex-lg-row justify-content-around align-items-center bg-primary rounded p-2 text-white ${styles.customBoxShadow} ${styles.rankingItem} ${styles.topThreeRanking}`}
                >
                  <img
                    src={medals.bronze}
                    alt="Rank 3"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <div
                    className={`d-flex flex-grow-1 justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[2].studentUsername}
                  </div>
                  <div
                    className={`d-flex flex-grow-1 justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[2].totalPoints} score
                  </div>
                </div>
              </Col>
            )}
          </Row>
          {/* Displaying the remaining leaderboard entries */}
          <Row className="pt-3 pb-3">
            <Col className={`text-black ${styles.subHeading}`}>Username</Col>
            <Col className={`text-center text-black ${styles.subHeading}`}>
              Rank
            </Col>
            <Col className={`text-center text-black ${styles.subHeading}`}>
              Score
            </Col>
          </Row>
          <Row>
            {students.slice(3).map((student, index) => (
              <RankingItem
                key={student.studentUsername}
                studentUsername={student.studentUsername}
                rank={index + 4} // because array is 0-indexed and top three are already displayed
                score={student.totalPoints}
              />
            ))}
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default Leaderboard;
