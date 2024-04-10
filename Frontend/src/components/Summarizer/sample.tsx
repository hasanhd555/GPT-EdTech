import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, ToggleButton, Form, Button } from 'react-bootstrap';

function SummarizerApp() {
  const [mode, setMode] = useState('paragraph');
  const [summaryLength, setSummaryLength] = useState(50); // Adjust the default value as needed

  const modes = [
    { name: 'Paragraph', value: 'paragraph' },
    { name: 'Bullet Points', value: 'bullet_points' },
  ];

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          
          {/* Mode Toggle Buttons */}
          <Form.Group as={Row} className="mb-3">
            <Col sm={12}>
              <ButtonGroup>
                {modes.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`toggle-${radio.value}`}
                    type="radio"
                    variant="outline-primary"
                    name="radio"
                    value={radio.value}
                    checked={mode === radio.value}
                    onChange={(e) => setMode(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>
          </Form.Group>

          {/* Text Input Area */}
          <Form.Group as={Row} className="mb-3">
            <Col sm={12}>
              <Form.Control as="textarea" rows={5} placeholder="Enter or paste your text" />
            </Col>
          </Form.Group>

          {/* Summary Length Slider */}
          <Form.Group as={Row} className="mb-3">
            <Col sm={12}>
              <Form.Label>Summary Length</Form.Label>
              <Form.Control
                type="range"
                value={summaryLength}
                onChange={(e) => setSummaryLength(Number(e.target.value))}
              />
            </Col>
          </Form.Group>

          {/* Summarize Button */}
          <Form.Group as={Row} className="mb-3">
            <Col sm={12}>
              <Button variant="success" size="lg" className="w-100">
                Summarize
              </Button>
            </Col>
          </Form.Group>

        </Col>
      </Row>
    </Container>
  );
}

export default SummarizerApp;
