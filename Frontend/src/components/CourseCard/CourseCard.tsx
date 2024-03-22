import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './CourseCard.module.css';

// Props interface for CourseCard
interface CourseCardProps {
  title: string;
  description: string;
  imageUrl: string;
  
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, imageUrl }) => {
  return (
    <Card className={`${styles.courseCard} shadow ${styles.cardWidth}`} style={{height:'100%'}}>
      <Card.Img variant="top" src={imageUrl} className={`${styles.cardImage} ${styles.squareImage}`} />
      <Card.Body>
        <Card.Title className={styles.courseHeading}>{title}</Card.Title>
        <Card.Text className={styles.courseSubHeading}>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
