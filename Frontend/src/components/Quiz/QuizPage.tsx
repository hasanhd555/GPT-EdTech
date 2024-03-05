import { Button, Card, Container } from "react-bootstrap";

function QuizPage() {
  return (
    <Container className="my-5 text-left px-5">
      <h1 className="text-center" style={{ textDecoration: "underline" }}>
        UI/UX Quiz
      </h1>
      <h4 className="text-center">Your Time has Begun</h4>
      <h4 className="text-center">Good Luck</h4>
      <Card className="text-left my-4 border-primary">
        <Card.Body className="px-5">
          <h2>Question 1:</h2>
          <Card.Text>
            What is the primary objective of User Interface (UI) design?
          </Card.Text>
          <div className="d-grid gap-2 text-start">
            <Button variant="outline-primary" className="text-start" size="lg">
              A) To create a visually appealing product
            </Button>
            <Button variant="outline-primary" className="text-start" size="lg">
              B) To make the user's interaction as simple and efficient as
              possible
            </Button>
            <Button variant="outline-primary" className="text-start" size="lg">
              C) To manage the backend processes of the application
            </Button>
            <Button variant="outline-primary" className="text-start" size="lg">
              D) To ensure the product is developed within a short timeframe
              possible
            </Button>
          </div>
        </Card.Body>
      </Card>

      <div className="d-grid gap-2 my-5 ">
        <Button variant="primary" size="lg">
          Submit
        </Button>
      </div>
    </Container>
  );
}

export default QuizPage;
