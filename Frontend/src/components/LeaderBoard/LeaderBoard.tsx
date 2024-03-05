import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./LeaderBoard.module.css"; // Assumed you have some CSS for styling
import { student_type } from "../../constant"; // Assuming this file is in the same directory
import RankingItem from "../RankingItem/RankingItem";

import { Container, Row, Col } from "react-bootstrap";

interface LeaderboardStudent extends student_type {
  totalPoints: number;
  studentUsername: string;
}

const Leaderboard: React.FC = () => {
  const [students, setStudents] = useState<LeaderboardStudent[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get<LeaderboardStudent[]>(
          "http://localhost:5001/api/enrollment/get-total-points"
        );
        // Assuming the API returns the list sorted by points
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  const medals = {
    gold: "http://res.cloudinary.com/do2hqf8du/image/upload/v1709652796/vuyzjib3oka1lpbh2ne5.svg",
    silver:
      "http://res.cloudinary.com/do2hqf8du/image/upload/v1709652859/ynmptmehr25iptbkqzbo.svg",
    bronze:
      "http://res.cloudinary.com/do2hqf8du/image/upload/v1709652918/eo1gkjmn5ymoyerfmkov.svg",
  };

  return (
    <Container fluid style={{ backgroundColor: "#f7f7f8" }}>
      <Row className="pt-3">
        <Col className="text-center">
          <h1>Student</h1>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col className="text-center">
          <h1>Leaderboard</h1>
        </Col>
      </Row>

      <Row>
        <Container
          className="pt-5 pb-5 px-5 mb-5"
          style={{ width: "75%", backgroundColor: "white" }}
        >
          <Row className="d-flex align-items-center mb-5">
            {students[1] && (
              <Col xs={12} md={12} lg={4}>
                <div
                  className={`d-flex flex-column flex-lg-row  justify-content-around bg-primary rounded p-2 text-white ${styles.customBoxShadow}`}
                  style={{ fontSize: "1rem" }}
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src={medals.silver}
                      alt="Rank 2"
                      style={{ width: "100%", height: "auto", flexShrink: 1 }}
                    />
                  </div>
                  <div
                    className={`d-flex justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[1].studentUsername}
                  </div>
                  <div
                    className={`d-flex justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[1].totalPoints} score
                  </div>
                </div>
              </Col>
            )}

            {/* The first place (center) */}
            {students[0] && (
              <Col xs={12} md={12} lg={4}>
                <div
                  className={`d-flex flex-column flex-lg-row  justify-content-around bg-primary rounded p-2 text-white ${styles.customBoxShadow}`}
                  style={{ fontSize: "1rem" }}
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src={medals.gold}
                      alt="Rank 1"
                      style={{ width: "100%", height: "auto", flexShrink: 1 }}
                    />
                  </div>

                  <div
                    className={`d-flex justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[0].studentUsername}
                  </div>
                  <div
                    className={`d-flex justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[0].totalPoints} score
                  </div>
                </div>
              </Col>
            )}

            {/* The third place (right side) */}
            {students[2] && (
              <Col xs={12} md={12} lg={4}>
                <div
                  className={`d-flex flex-column flex-lg-row  justify-content-around bg-primary rounded p-2 text-white ${styles.customBoxShadow}`}
                  style={{ fontSize: "1rem" }}
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src={medals.bronze}
                      alt="Rank 3"
                      style={{ width: "100%", height: "auto", flexShrink: 1 }}
                    />
                  </div>
                  <div
                    className={`d-flex justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[2].studentUsername}
                  </div>
                  <div
                    className={`d-flex justify-content-center align-items-center px-2 ${styles.customText}`}
                  >
                    {students[2].totalPoints} score
                  </div>
                </div>
              </Col>
            )}
          </Row>
          <Row className="pt-3 pb-3">
            <Col className={` text-black ${styles.subHeading}`}>Username</Col>
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
                rank={index + 4} // because array is 0-indexed and we have already displayed the top 3
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
