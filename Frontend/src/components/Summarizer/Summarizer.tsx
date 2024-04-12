// Import necessary React and React-Bootstrap components
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Form,
} from "react-bootstrap";
import OpenAI from "openai"; // Import OpenAI library for API access
import Spinner from "react-bootstrap/Spinner"; // Spinner component for loading indication

// Define the Summarizer functional component
const Summarizer = () => {
  // Initialize OpenAI with API key and configuration
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPEN_AI_KEY, // API key from environment variable for security
    dangerouslyAllowBrowser: true, // Flag to enable browser usage, be cautious with this setting
  });

  // State hooks for managing component state
  const [errorMessage, setErrorMessage] = useState(""); // State for any error messages that occur
  const [mode, setMode] = useState<String>("paragraph"); // State to toggle between paragraph and bullet points mode
  const [role, setRole] = useState<String>("summarizer"); // State to toggle between summarizer and notes maker mode
  const [textWordCount, setTextWordCount] = useState(0); // State to store word count of the input text
  const [summaryWordCount, setSummaryWordCount] = useState(0); // State to store word count of the summary
  const [inputText, setInputText] = useState(""); // State for the input text to be summarized
  const [summary, setSummary] = useState(""); // State for the generated summary
  const [loading, setLoading] = useState(false); // State to indicate loading status

  // Function to update the summarization mode (paragraph or bullet points)
  const handleModeChange = (val: String) => setMode(val);

  // Function to update the role mode (summarizer and notes maker)
  const handleRoleChange = (val: String) => setRole(val);

  // Effect hook to update textWordCount when inputText changes
  useEffect(() => {
    const words = inputText.trim().split(/\s+/); // Split the input text into words by whitespace
    const nonEmptyWords = words.filter((word) => word); // Filter out empty strings to count only valid words
    setTextWordCount(nonEmptyWords.length); // Update the word count state
  }, [inputText]); // Dependency array to re-run the effect when inputText changes

  // Asynchronous function to send a request to OpenAI for text summarization
  const summarizeText = async () => {
    const wordCount = inputText.trim().split(/\s+/).length; // Calculate the number of words in the input text
    if (!inputText.trim()) { // Check if input text is not empty
      setErrorMessage("Please enter some text or a title."); // Set error message if input is empty
      setSummary(""); // Clear any existing summary
      setSummaryWordCount(0); // Reset summary word count
      return; // Exit the function if input is empty
    }

    if(role==="summarizer"){
      if (wordCount > 500) { // Check if the word count exceeds 500
        setErrorMessage("Input text exceeded the maximum word limit of 500. Please keep it below the word limit"); // Set the appropriate error message
        setSummary(""); // Clear any existing summary
        setSummaryWordCount(0); // Reset the summary word count
        return; // Exit the function to prevent further processing
      }
      if (wordCount <= 20) { // Check if the word count is below 20
        setErrorMessage("Input text is too short to summarize. Please keep it above 20 words."); // Set the appropriate error message
        setSummary(""); // Clear any existing summary
        setSummaryWordCount(0); // Reset the summary word count
        return; // Exit the function to prevent further processing
      }
      setLoading(true); // Indicate loading status
    setErrorMessage(""); // Clear any existing error messages
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a text summarizer." }, // System message to define the AI's role
          { role: "user", content: inputText + `\n\nTl;dr` }, // User's input text with a prompt for summary
        ],
        model: "gpt-3.5-turbo", // Specify the model to use for summarization
        temperature: 0.1, // Low temperature for deterministic output
        max_tokens: (wordCount+2)/2, // Maximum token length for the summary
        top_p: 1,
        frequency_penalty: 0, // No penalty on frequency to allow repeated information if necessary
        presence_penalty: 0.5, // Slight penalty to encourage diversity in the summary
        stop: ['"""'], // Stop sequence to end the summary
      });

      // Check if the completion contains a valid summary
      if (completion.choices[0]?.message?.content) {
        setLoading(false); // Update loading status
        const summarizedText: string = completion.choices[0]?.message?.content; // Extract the summary from the response
        setSummary(summarizedText); // Update the summary state
        setSummaryWordCount(summarizedText.split(/\s+/).length); // Update the summary word count
      }
    } catch (err) {
      // console.log(err)
      setLoading(false); // Update loading status in case of error
      setSummary(""); // Clear any existing summary on error
      setSummaryWordCount(0); // Reset summary word count on error
      setErrorMessage("An error occurred while summarizing. Please try again."); // Set the error message
    }
    }

    if(role==="notes_maker"){
      if (wordCount >= 10) { // Check if the word count(of title) exceeds 10
        setErrorMessage("Input title exceeded the word limit. Please keep the title below 10 words."); // Set the appropriate error message
        setSummary(""); // Clear any existing summary
        setSummaryWordCount(0); // Reset the summary word count
        return; // Exit the function to prevent further processing
      }
      setLoading(true); // Indicate loading status
    setErrorMessage(""); // Clear any existing error messages
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a notes maker." }, // System message to define the AI's role
          { role: "user", content: inputText + "\n\nMake short notes related to this title. They should be in continous paragraph form." }, // User's input text with a prompt for summary
        ],
        model: "gpt-3.5-turbo", // Specify the model to use for notes making
        temperature: 0.1, // Low temperature for deterministic output
        max_tokens: 300, // Maximum token length for the notes
        top_p: 1,
        frequency_penalty: 0, // No penalty on frequency to allow repeated information if necessary
        presence_penalty: 0.5, // Slight penalty to encourage diversity in the notes
        stop: ['"""'], // Stop sequence to end the notes
      });

      // Check if the completion contains a valid summary
      if (completion.choices[0]?.message?.content) {
        setLoading(false); // Update loading status
        const summarizedText: string = completion.choices[0]?.message?.content; // Extract the summary from the response
        setSummary(summarizedText); // Update the summary state
        setSummaryWordCount(summarizedText.split(/\s+/).length); // Update the summary word count
      }
    } catch (err) {
      // console.log(err)
      setLoading(false); // Update loading status in case of error
      setSummary(""); // Clear any existing summary on error
      setSummaryWordCount(0); // Reset summary word count on error
      setErrorMessage("An error occurred while generating notes. Please try again."); // Set the error message
    }
    }
  };

  // Configuration array for the toggle buttons (modes)
  const modes = [
    { name: "Paragraph", value: "paragraph" },
    { name: "Bullet Points", value: "bullet" },
  ];

    // Configuration array for the toggle buttons (modes)
    const roles = [
      { name: "Summarizer", value: "summarizer" },
      { name: "Notes Maker", value: "notes_maker" },
    ];

  // Render the component
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
            className="d-flex flex-row align-items-center w-100 justify-content-evenly"
            style={{ minHeight: "8vh", borderBottom: "1px solid black" }}
          >
            {/* Role selection UI */}
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h6 style={{fontSize:'2.5vh'}}>Role </h6>
              <ButtonGroup className="ms-3">
                {roles.map((m, idx) => (
                  <ToggleButton
                    className=""
                    key={idx}
                    id={`role-${idx}`}
                    type="radio"
                    variant="primary"
                    name="role"
                    value={m.value}
                    checked={role === m.value}
                    onChange={(e) => handleRoleChange(e.currentTarget.value)}
                  >
                    {m.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
            {/* Mode selection UI */}
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h6 style={{fontSize:'2.5vh'}}>Mode </h6>
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
          </div>
          <div className="d-flex flex-row">
            {/* Input text area */}
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
                    onChange={(e) => setInputText(e.target.value)} // Update input text state on change
                  />
                </Col>
              </Form.Group>
              {/* Button to trigger summarization and display word count */}
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
                  onClick={summarizeText} // Call summarizeText function on click
                >
                  Generate
                </button>
              </div>
            </div>
            {/* Summary display area */}
            <div
              className="w-50 d-flex flex-column align-items-center justify-content-between"
              style={{ minHeight: "60vh" }}
            >
              <div style={{ minHeight: "40vh" }}>
                {loading ? ( // Show loading spinners when loading
                  <div className="d-flex justify-content-center align-items-center pt-5">
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="primary" />
                  </div>
                ) : errorMessage ? ( // Show error message if present
                  <p className="m-5 text-danger">{errorMessage}</p>
                ) : mode === "paragraph" ? ( // Display summary as paragraph
                  <p className="m-5">{summary}</p>
                ) : ( // Display summary as bullet points if mode is 'bullet'
                  summary && (
                    <ul className="m-5">
                      {summary
                        .split(". ")
                        .map(
                          (item, index) =>
                            item.trim() && <li key={index}>{item}</li>
                        )
                        .filter(Boolean)}{" "}
                    </ul>
                  )
                )}
              </div>

              {/* Display summary word count */}
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

// Export the Summarizer component for use in other parts of the application
export default Summarizer;
