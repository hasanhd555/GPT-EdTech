import React from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { lesson_type } from "../constant";
import { useState } from "react";

const hoverEffectStyle = {
  transition: "background-color 0.3s",
  cursor: "pointer",
};

const CourseContentPage = () => {
  const [selectedItem, setSelectedItem] = useState<HTMLLIElement | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    const listItem = e.currentTarget;
    if (selectedItem !== listItem) {
      (listItem as HTMLLIElement).style.backgroundColor = "#0D6EFD";
      listItem.querySelectorAll("h4, h6").forEach((element: Element) => {
        if (element instanceof HTMLElement) {
          element.style.color = "white";
        }
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    const listItem = e.currentTarget;
    if (selectedItem !== listItem) {
      (listItem as HTMLLIElement).style.backgroundColor = "";
      listItem.querySelectorAll("h4, h6").forEach((element: Element) => {
        if (element instanceof HTMLElement) {
          element.style.color = "";
        }
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const listItem = e.currentTarget;
    if (selectedItem) {
      (selectedItem as HTMLLIElement).style.backgroundColor = "";
      selectedItem.querySelectorAll("h4, h6").forEach((element: Element) => {
        if (element instanceof HTMLElement) {
          element.style.color = "";
        }
      });
    }
    setSelectedItem(listItem);
    (listItem as HTMLLIElement).style.backgroundColor = "#0D6EFD";
    listItem.querySelectorAll("h4, h6").forEach((element: Element) => {
      if (element instanceof HTMLElement) {
        element.style.color = "white";
      }
    });
  };
  return (
    <>
      <Container className="d-flex flex-row" fluid>
        <Col
          className="col-md-4 col-sm-12 col-lg-4 p-4 d-flex flex-column align-items-center"
          style={{ backgroundColor: "#F7F7F8" }}
        >
          <h1 className="text-decoration-underline mt-5 text-center">
            Chapters
          </h1>
          {/* Lesson titles and their lesson_num will be rendered here */}
          <ListGroup className="w-75">
            <ListGroup.Item
              className="p-3 mt-3"
              style={hoverEffectStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              <h4>Lesson Title</h4>
              <h6 className="">Lesson #</h6>
            </ListGroup.Item>
            <ListGroup.Item
              className="p-3 mt-3"
              style={hoverEffectStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              <h4>Lesson Title</h4>
              <h6 className="">Lesson #</h6>
            </ListGroup.Item>
            <ListGroup.Item
              className="p-3 mt-3"
              style={hoverEffectStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              <h4>Lesson Title</h4>
              <h6 className="">Lesson #</h6>
            </ListGroup.Item>
            <ListGroup.Item
              className="p-3 mt-3"
              style={hoverEffectStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              <h4>Lesson Title</h4>
              <h6 className="">Lesson #</h6>
            </ListGroup.Item>
            <Button className="p-3 mt-4 mb-5">Start Quiz</Button>
          </ListGroup>
        </Col>
        <Col className="col-md-8 col-sm-12 p-4 col-lg-8 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center mt-5">Course Title</h1>
          <p className="text-center w-75 mt-5 mb-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed earum,
            sunt natus praesentium perspiciatis amet? Nihil, inventore numquam!
            Quidem necessitatibus repellat perferendis, atque tenetur aspernatur
            praesentium ad qui itaque voluptate ipsam omnis nisi, quibusdam,
            error quo optio sit officiis deserunt maxime eaque odit. Harum nobis
            mollitia unde, delectus illo modi corrupti fugit dolores temporibus
            hic voluptatum distinctio architecto consectetur ipsam vel rem,
            aliquam sint tempore assumenda inventore, autem fuga quisquam!
            Explicabo, eveniet nihil, a iure quae iusto quis vel nesciunt natus
            beatae officia ex maiores accusamus, quam molestias ipsa ea quisquam
            culpa praesentium obcaecati? Cupiditate repellendus consequatur non
            sint dolor veniam numquam quas! Deleniti ex sunt saepe maxime
            minima, quasi maiores eaque hic illo adipisci natus eligendi dolores
            officia delectus rem incidunt corporis totam repudiandae perferendis
            est non velit repellendus labore? Asperiores, recusandae! Voluptatem
            quasi est similique quas repellendus sed molestiae ab sequi suscipit
            repudiandae, porro consequatur cum error, iusto, voluptatibus
            aliquid modi maiores. Aliquid quia quas nulla eveniet exercitationem
            repellat veniam totam dolore iste amet, fuga similique debitis ex
            omnis voluptatibus ut recusandae? Dolore, quod ipsa amet, totam
            aperiam culpa pariatur vel accusamus ullam explicabo modi, ad magni
            vero perspiciatis voluptatibus ab. Iste, animi nulla dolorem beatae
            saepe totam, odit iusto laudantium possimus placeat quam quae,
            soluta dignissimos enim modi necessitatibus aliquam vel. Odit, quam
            ipsa? Deserunt amet qui aliquid odit. Voluptas ad rerum labore iusto
            aliquam odio, repellendus, laboriosam expedita eaque aliquid dolorum
            modi sit? Sed pariatur, dolore rem inventore culpa delectus nisi
            nemo quaerat, quod incidunt atque esse molestias, at soluta. Ipsam
            aut quasi tempore! Neque earum reiciendis, officia consequuntur rem
            libero repellat, ipsa, ratione modi explicabo vero molestiae! Rem ut
            fugiat reprehenderit quibusdam voluptatibus blanditiis nemo tempora.
            Modi ab eligendi, distinctio ratione corporis veniam blanditiis
            autem sunt odio sequi ipsam labore delectus qui ut harum quaerat,
            dolorum quam earum magni amet veritatis vero fugiat praesentium
            velit. Odit similique ipsum debitis dicta a adipisci corrupti fugit
            voluptatibus odio natus possimus optio impedit amet laborum,
            necessitatibus incidunt omnis deserunt illum deleniti quo neque
            voluptatem esse cumque. Maiores ipsa veniam debitis nobis ducimus
            consequatur ex vero sint, ipsam consequuntur deleniti vitae
            delectus, nulla fugiat tempore aperiam voluptatibus. Fugiat rerum
            deserunt consectetur tempora culpa neque placeat nihil, impedit amet
            corporis distinctio ut? Libero quis excepturi magni ipsum minus
            ipsam minima laborum expedita inventore possimus eaque quas voluptas
            ullam, quasi at nam obcaecati quia eos consectetur vel. Inventore
            eos provident ut minus harum deleniti beatae sed itaque quod
            exercitationem unde totam corrupti optio repudiandae porro
            voluptatibus, molestias atque! Alias, aliquam. Eveniet enim
            doloribus quas quam deserunt similique dicta nobis, et ea veritatis
            ut quia vero pariatur! Nesciunt, vero ipsum? Qui velit iusto aliquid
            unde distinctio id non deleniti nemo quia quod! Impedit minima
            tempore porro debitis mollitia hic praesentium iusto adipisci
            explicabo minus consequuntur placeat modi natus voluptatum earum
            dolore, quos illo? Provident aspernatur modi repellat odit
            consectetur eum quae autem deserunt a possimus laboriosam animi
            corrupti velit architecto eius, maiores sunt fugit at ex. Iste
            fugiat similique reiciendis architecto eum.
          </p>
        </Col>
      </Container>
    </>
  );
};

export default CourseContentPage;
