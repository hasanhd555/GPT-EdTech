
import {
    Card,
    Container,
    Row,
    Col,
    Button,
    Form,
    FormControl,
    InputGroup,
  } from "react-bootstrap";
  import styles from "./Testimonials.module.css";

const Testimonials:React.FC = () => {

    return (
        <Container fluid className={`${styles["background"]} text-center`}>
            <h2 className={`${styles["green-text"]} py-5`}>
            What our Students <br/>Say About Us
            </h2>
        </Container>

    );
};

export default Testimonials;