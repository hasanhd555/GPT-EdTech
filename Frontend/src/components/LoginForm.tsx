import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"; // Import yup for validation
import { Container, Row, Col, Card, Button, Form as BootstrapForm, InputGroup } from "react-bootstrap"; // Import React Bootstrap components

// Define validation schema using yup
const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface LoginFormProps {
  // Define any props you might need here
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown((passwordShown: boolean) => !passwordShown);
  };

  const handleSubmit = (values: any, actions: any) => {
    // Handle the form submission logic here
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <h2 className="card-title text-center mb-4">Login</h2>
              <p className="text-center">
                Login to continue your learning experience.
              </p>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <BootstrapForm.Label>Email</BootstrapForm.Label>
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter your Email"
                        as={BootstrapForm.Control}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <BootstrapForm.Label>Password</BootstrapForm.Label>
                      <InputGroup>
                        <Field
                          name="password"
                          type={passwordShown ? "text" : "password"}
                          className="form-control"
                          placeholder="Password"
                          as={BootstrapForm.Control}
                        />
                        <InputGroup.Text>
                          <FontAwesomeIcon
                            icon={passwordShown ? faEyeSlash : faEye}
                            onClick={togglePasswordVisibility}
                          />
                        </InputGroup.Text>
                      </InputGroup>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="d-grid">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Login"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="mt-3 text-center">
                Don't have an account? <a href="/signup">Sign Up</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
