import React from "react";
import { Card } from "react-bootstrap";
import styles from "./CourseCard.module.css";

// Props interface declaration for the CourseCard component
// Defines the types for props that the component expects
interface CourseCardProps {
  title: string; // Title of the course
  description: string; // Description of the course
  imageUrl: string; // URL for the course image
}

// React Functional Component for displaying a course card
// Receives title, description, and imageUrl as props from its parent component
const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  const truncateDescription = (text: string, maxLength: number) => {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  };

  const truncateTitle = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    // React-Bootstrap Card component styled with custom CSS classes and inline styles
    <Card
      className={`${styles.courseCard} shadow ${styles.cardWidth}`}
      style={{ height: "100%" }}
    >
      {/* Card.Img is a subcomponent of Card that displays the image. Applied styles control the appearance and size */}
      <Card.Img
        variant="top"
        src={imageUrl}
        className={`${styles.cardImage} ${styles.squareImage}`}
      />
      {/* Card.Body contains the content area of the card for text like title and description */}
      <Card.Body>
        {/* Card.Title displays the course title. Styled to define how the title looks */}
        <Card.Title className={styles.courseHeading}>{truncateTitle(title, 35)}</Card.Title>
        {/* Card.Text displays the course description and is styled for subheading appearance */}
        <Card.Text className={styles.courseSubHeading}>
          {truncateDescription(description, 10)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Export the CourseCard component to be used in other parts of the application
export default CourseCard;
