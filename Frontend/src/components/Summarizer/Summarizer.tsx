import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Form,
} from "react-bootstrap";
import axios from "axios";

const Summarizer = () => {
  const [summaryLength, setSummaryLength] = useState(50);
  const [mode, setMode] = useState<String>("paragraph");
  const [textWordCount, setTextWordCount] = useState(0);
  const [summaryWordCount, setSummaryWordCount] = useState(0);
  // Function to update mode state
  const handleModeChange = (val: String) => setMode(val);

  // Array to hold toggle buttons config
  const modes = [
    { name: "Paragraph", value: "paragraph" },
    { name: "Bullet Points", value: "bullet" },
  ];
  return (
    <>
      <Container
        className=""
        fluid
        style={{ backgroundColor: "#d1d5db", border: "2px solid #d1d5db" }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="m-4" style={{ textAlign: "center" }}>
            Content Summarizer
          </h1>
        </div>
        <div className="container mb-4" style={{ backgroundColor: "white" }}>
          <div
            className="d-flex flex-row align-items-center justify-content-center w-100"
            style={{ minHeight: "8vh", borderBottom: "1px solid black" }}
          >
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h6>Modes: </h6>
              <ButtonGroup className="ms-3">
                {modes.map((m, idx) => (
                  <ToggleButton
                    className=""
                    key={idx}
                    id={`mode-${idx}`}
                    type="radio"
                    variant="primary"
                    name="mode"
                    value={m.value}
                    checked={mode === m.value}
                    onChange={(e) => handleModeChange(e.currentTarget.value)}
                  >
                    {m.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center w-50">
              <h6 className="ms-4">Summary Length: </h6>
              <Form.Control
                className="w-25 ms-2"
                type="range"
                value={summaryLength}
                onChange={(e) => setSummaryLength(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div
              className="w-50 d-flex flex-column align-items-center justify-content-between"
              style={{ borderRight: "1px solid black", minHeight: "60vh" }}
            >
              <Form.Group as={Row} className="m-5 w-100 h-100">
                <Col>
                  <Form.Control
                    className="h-100"
                    as="textarea"
                    rows={5}
                    placeholder="Enter or paste your text"
                  />
                </Col>
              </Form.Group>
              <div className="d-flex flex-row w-100 justify-content-between mb-2">
                <h6 className="align-self-start ms-3 my-2">Word Count: {textWordCount}</h6>
                <button className="btn btn-primary me-3 ">Summarize</button>
              </div>
            </div>
            <div
              className="w-50 d-flex flex-column align-items-center justify-content-between"
              style={{ minHeight: "60vh" }}
            >
              <div style={{ minHeight: "40vh" }}>
                <p className="m-5">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Necessitatibus, est. Culpa sint officiis sequi alias autem
                  molestiae magnam repudiandae. Dolorem possimus distinctio
                  corporis a quaerat quia hic. Ducimus, voluptas? Qui at
                  asperiores consectetur modi alias labore vel nostrum
                  provident, eos dolore, omnis quia. Veniam cupiditate saepe,
                  repellendus velit voluptate voluptatem quia aspernatur minus
                  quos minima? Accusamus a eveniet harum? Temporibus quis animi
                  vel, est sequi illum laborum totam. Alias, placeat. Maiores
                  odio libero recusandae quod, perferendis eveniet. Ea, hic
                  voluptatum illum odio cupiditate doloremque quasi dolorem ad
                  suscipit placeat ut quas culpa nostrum earum dolores
                  voluptate? Expedita libero aspernatur fugit!
                </p>
              </div>
              <h6 className="align-self-start ms-5 mb-3">Word Count: {summaryWordCount}</h6>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Summarizer;
