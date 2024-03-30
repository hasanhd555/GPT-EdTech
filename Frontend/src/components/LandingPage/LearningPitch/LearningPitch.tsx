import { Row, Col } from "react-bootstrap";
import styles from "./LearningPitch.module.css";
import { logo1,logo2,logo3 } from "./LogoUrls";

const LearningPitch: React.FC = () => {
    return (
        <div className={`${styles["custom-purple-blue-gradient"]} text-center p-4`}>
            <h2 className={`${styles["rowdies-light"]} text-white mt-4`}>
                Why <span className={`${styles["blue-text"]}`}>Learn</span> with our courses?
            </h2>
            <p className={`${styles["saira-txt"]} text-white`}>lorem ipsum bla blue </p>

            <Row className="mt-4 text-white">
                <Col className={`text-center  ${styles["border-right"]} py-4`} xs={4}>
                    <img src={logo1} alt="Logo 1" className="mb-3" />
                    <h3 className={`${styles["rowdies-light"]} text-white mt-4`}>
                    01. Learn</h3>
                    <p className={`${styles["saira-txt"]} text-white`}>Paragraph of text for section 1.</p>
                </Col>
                <Col className={`text-center  ${styles["border-right"]} py-4`} xs={4}>
                    <img src={logo2} alt="Logo 2" className="mb-3" />
                    <h3 className={`${styles["rowdies-light"]} text-white mt-4`}>
                    02. Graduate</h3>
                    <p className={`${styles["saira-txt"]} text-white`}>Paragraph of text for section 2.</p>
                </Col>
                <Col className={`text-center  py-4`} xs={4}>
                    <img src={logo3} alt="Logo 3" className="mb-3" />
                    <h3 className={`${styles["rowdies-light"]} text-white mt-4`}>
                    03. Work</h3>
                    <p className={`${styles["saira-txt"]} text-white`}>Paragraph of text for section 3.</p>
                </Col>
            </Row>
        </div>
    );
};

export default LearningPitch;
