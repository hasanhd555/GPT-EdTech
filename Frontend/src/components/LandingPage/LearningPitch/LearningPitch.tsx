import { Row, Col } from "react-bootstrap";
import styles from "./LearningPitch.module.css";
import columnsData from "./LearningData";

const LearningPitch: React.FC = () => {
  

  return (
    <div className={`${styles["custom-purple-blue-gradient"]} text-center p-4`}>
      <h2 className={`${styles["rowdies-light"]} text-white mt-4`}>
        Why <span className={`${styles["blue-text"]}`}>Learn</span> with our
        courses?
      </h2>
      <p className={`${styles["saira-txt"]} text-white`}>
        Explore Boundless Learning Opportunities 
      </p>

      <Row className="mt-4 text-white pt-4 pb-4">
        {/* Map over the columnsData array and render each column dynamically */}
        {columnsData.map((column, index) => (
          <Col key={index} className={`text-center ${index !== columnsData.length - 1 ? styles["border-right"] : ""} py-4 px-4 pd-4`} xs={4}>
            <img src={column.logo} alt={`Logo ${index + 1}`} className="mb-3" />
            <h3 className={`${styles["rowdies-light"]} text-white mt-4`}>
              {column.title}
            </h3>
            <p className={`${styles["saira-txt"]} text-white`}>
              {column.description}
            </p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LearningPitch;

