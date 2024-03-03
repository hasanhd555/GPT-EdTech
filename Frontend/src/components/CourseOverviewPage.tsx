import React from "react";
import NavbarComp from "./Navbar and Footer/Navbar";
import Footer from "./Navbar and Footer/Footer";
import { Container, Row, Col, Image } from "react-bootstrap";

const CourseOverviewPage = () => {
  return (
    <>
      <NavbarComp></NavbarComp>
      <Container className="" fluid 
      style={{ border: "1px solid black" }}
      >
        <Row className="mx-5" 
        style={{ border: "1px solid red" }}
        >
          <Col
            className="d-flex flex-column p-5 justify-content-center align-items-center"
            style={{ border: "1px solid green" }}
          >
            {/* will render course title and description in this column */}
            <h1>UI/UX Design Course</h1>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              laudantium praesentium atque, adipisci eaque neque omnis aliquam
              expedita maiores earum sed suscipit dignissimos unde perspiciatis
              repellendus tenetur fugiat consequuntur ad odit enim obcaecati
              quis! Sint sequi vitae amet iure nam nobis incidunt suscipit
              perspiciatis rerum necessitatibus ipsa quod laudantium ipsam,
              illum cumque debitis, veniam maxime commodi cum nulla atque?
              Fugiat similique deleniti veritatis commodi animi, rerum, esse quo
              saepe cum temporibus exercitationem eligendi itaque nesciunt
              adipisci soluta quae illum perferendis minima? Earum culpa aliquam
              fugit magni molestias expedita ducimus numquam consequatur? Earum
              enim dolorum quasi nostrum quia omnis. Ipsa, labore!
            </p>
          </Col>
          <Col
            className="d-flex flex-column p-5"
            style={{ border: "1px solid green" }}
          >
            {/* Image will be rendered in this column*/}
            
              <Image
                fluid
                src="http://res.cloudinary.com/do2hqf8du/image/upload/v1709468796/qqp692joki8suw0cvmrq.jpg"
                alt="Course Page"
                className="m-auto"
                style={{ width: "30vw", height: "auto" }}
              />
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default CourseOverviewPage;
