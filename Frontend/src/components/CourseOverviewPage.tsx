import React from "react";
import NavbarComp from "./Navbar and Footer/Navbar";
import Footer from "./Navbar and Footer/Footer";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import StarRating from "./StarRating";

const CourseOverviewPage = () => {
  return (
    <>
      <NavbarComp></NavbarComp>
      <Container
        className=""
        fluid
        style={{backgroundColor: "#F7F7F8" }}
      >
        <Row
          className="mx-5"
          // style={{ border: "1px solid red" }}
        >
          <Col
            className="d-flex flex-column p-5 justify-content-center align-items-center"
            // style={{ border: "1px solid green" }}
          >
            {/* will render course title and description in this column */}
            <h1 className="">UI/UX Design Course</h1>
            <p className=" mt-3 w-75">
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
            // style={{ border: "1px solid green" }}
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
        <Row
          className="mx-5"
          // style={{ border: "1px solid blue" }}
        >
          <Col
            className="d-flex flex-column p-5 align-items-center"
            // style={{ border: "1px solid orange" }}
          >
            <h2 className="text-decoration-underline">Chapters</h2>
            {/* Chapters of course will be rendered here like a list */}
            <ListGroup className="w-75">
              <ListGroup.Item className="p-3 mt-3">
                <h4>Understanding UI/UX Design Principles</h4>
                <h6 className="text-black-50">Chapter 01</h6>
              </ListGroup.Item>
              <ListGroup.Item className="p-3 mt-3">
                <h4>Understanding UI/UX Design Principles</h4>
                <h6 className="text-black-50">Chapter 01</h6>
              </ListGroup.Item>
              <ListGroup.Item className="p-3 mt-3">
                <h4>Understanding UI/UX Design Principles</h4>
                <h6 className="text-black-50">Chapter 01</h6>
              </ListGroup.Item>
              <ListGroup.Item className="p-3 mt-3">
                <h4>Understanding UI/UX Design Principles</h4>
                <h6 className="text-black-50">Chapter 01</h6>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col
            className="d-flex flex-column p-5 align-items-center"
            // style={{ border: "1px solid orange" }}
          >
            {/* Rating will be fetched and passed to StarRating component */}
            <StarRating rating={3.5} />
            <h2 className="text-decoration-underline mt-5">
              Community Comments
            </h2>
            {/* Community comments will be rendered here like a list */}
            <ListGroup className="w-75">
              <ListGroup.Item className="p-3 mt-3 border-0">
                <h4>Musa Zulfiqar</h4>
                <h6 className="text-black-50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                  ad sapiente deserunt earum, neque incidunt rerum ullam nihil
                  ipsam, beatae omnis excepturi eaque hic nam debitis temporibus
                  esse veritatis corrupti!
                </h6>
              </ListGroup.Item>
              <ListGroup.Item className="p-3 mt-3 border-0">
                <h4>Musa Zulfiqar</h4>
                <h6 className="text-black-50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                  ad sapiente deserunt earum, neque incidunt rerum ullam nihil
                  ipsam, beatae omnis excepturi eaque hic nam debitis temporibus
                  esse veritatis corrupti!
                </h6>
              </ListGroup.Item>
              <ListGroup.Item className="p-3 mt-3 border-0">
                <h4>Musa Zulfiqar</h4>
                <h6 className="text-black-50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                  ad sapiente deserunt earum, neque incidunt rerum ullam nihil
                  ipsam, beatae omnis excepturi eaque hic nam debitis temporibus
                  esse veritatis corrupti!
                </h6>
              </ListGroup.Item>
              <ListGroup.Item className="p-3 mt-3 border-0">
                <h4>Musa Zulfiqar</h4>
                <h6 className="text-black-50">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                  ad sapiente deserunt earum, neque incidunt rerum ullam nihil
                  ipsam, beatae omnis excepturi eaque hic nam debitis temporibus
                  esse veritatis corrupti!
                </h6>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default CourseOverviewPage;
