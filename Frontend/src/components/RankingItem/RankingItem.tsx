import React from "react";
import styles from "../LeaderBoard/LeaderBoard.module.css"; // Assumed you have some CSS for styling
import { Row, Col, Container } from "react-bootstrap";

interface RankingItemProps {
  studentUsername: string;
  rank: number;
  score: number;
}

const RankingItem: React.FC<RankingItemProps> = ({
  studentUsername,
  rank,
  score,
}) => {
  return (
    <div className={`d-flex justify-content-between align-items-center p-2`}>
      <Container fluid>
        <Row
          className={`d-flex justify-content-around bg-primary rounded p-2 text-white ${styles.customBoxShadow} ${styles.rankingItem}`}
        >
          <Col>
            <span className={`${styles.customText}`}>@{studentUsername}</span>
          </Col>
          <Col className="text-center">
            <span className={`${styles.customText}`}>{rank}</span>
          </Col>
          <Col className="text-center">
            <span className={`${styles.customText}`}>{score}</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RankingItem;
