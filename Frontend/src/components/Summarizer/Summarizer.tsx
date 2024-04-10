import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Form,
} from "react-bootstrap";
import axios from "axios";
import OpenAI from "openai";
import Spinner from "react-bootstrap/Spinner";

const Summarizer = () => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPEN_AI_KEY,
    dangerouslyAllowBrowser: true,
  });
  const [summaryLength, setSummaryLength] = useState(50);
  const [mode, setMode] = useState<String>("paragraph");
  const [textWordCount, setTextWordCount] = useState(0);
  const [summaryWordCount, setSummaryWordCount] = useState(0);
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  // Function to update mode state
  const handleModeChange = (val: String) => setMode(val);

  // Add useEffect to update textWordCount when inputText changes
  useEffect(() => {
    const words = inputText.trim().split(/\s+/); // Split the inputText by whitespace to get words
    const nonEmptyWords = words.filter((word) => word); // Filter out any empty strings from the array
    setTextWordCount(nonEmptyWords.length); // Update the textWordCount state with the length of nonEmptyWords array
  }, [inputText]); // This useEffect depends on inputText, so it runs whenever inputText changes

  // Function to send request to OpenAI API for summarization
  const summarizeText = async () => {
    setLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a text summarizer." },
          { role: "user", content: inputText + `\n\nTl;dr` },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.1,
        max_tokens: summaryLength,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.5,
        stop: ['"""'],
      });

      if (completion.choices[0]?.message?.content) {
        setLoading(false);
        const summarizedText: string = completion.choices[0]?.message?.content;
        setSummary(summarizedText);
        setSummaryWordCount(summarizedText.split(/\s+/).length);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                min={50} // Minimum summary length
                max={200} // Maximum summary length
                step={10} // Step
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
                    value={inputText}
                    placeholder="Enter or paste your text"
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <div className="d-flex flex-row w-100 justify-content-between mb-2">
                <h6 className="align-self-start ms-3 my-2">
                  Word Count: {textWordCount}
                </h6>
                <button
                  className={
                    loading
                      ? "btn btn-primary me-3 disabled"
                      : "btn btn-primary me-3"
                  }
                  onClick={summarizeText}
                >
                  Summarize
                </button>
              </div>
            </div>
            <div
              className="w-50 d-flex flex-column align-items-center justify-content-between"
              style={{ minHeight: "60vh" }}
            >
              <div style={{ minHeight: "40vh" }}>
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center pt-5">
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="primary" />
                  </div>
                ) : mode === "paragraph" ? (
                  <p className="m-5">{summary}</p>
                ) : (
                  summary && (
                    <ul className="m-5">
                      {summary
                        .split(". ")
                        .map(
                          (item, index) =>
                            item.trim() && <li key={index}>{item}</li> // Check if item is not just whitespace
                        )
                        .filter(Boolean)}{" "}
                    </ul>
                  )
                )}
              </div>

              <h6 className="align-self-start ms-5 mb-3">
                Word Count: {summaryWordCount}
              </h6>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Summarizer;
