import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"; // Import yup for validation
import { Container, Row, Col, Card, Button, Form as BootstrapForm, InputGroup, FormCheck } from "react-bootstrap"; // Import React Bootstrap components
import validationSchema from "../Schemas/validationSchema";

interface SignUpFormProps {
  // Define any props you might need here
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  // const [studentCredentialsShown,setStudentCredentialsShown] = useState(false);

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
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <p className="text-center">
                Create an account to unlock exclusive features.
              </p>
              <Formik
                initialValues={{
                  fullName: "",
                  age: "",
                  username: "",
                  email: "",
                  password: "",
                  terms: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <BootstrapForm.Label>Full Name</BootstrapForm.Label>
                      <Field
                        name="fullName"
                        type="text"
                        className="form-control"
                        placeholder="Enter your Name"
                        as={BootstrapForm.Control}
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <BootstrapForm.Label>Age</BootstrapForm.Label>
                      <Field
                        name="age"
                        type="number"
                        className="form-control"
                        placeholder="Enter your age"
                        min="0"
                        as={BootstrapForm.Control}
                      />
                      <ErrorMessage
                        name="age"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <BootstrapForm.Label>Username</BootstrapForm.Label>
                      <Field
                        name="username"
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        as={BootstrapForm.Control}
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-danger"
                      />
                    </div>
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
                    <div className="mb-3 form-check">
                      <Field
                        name="terms"
                        type="checkbox"
                        className="form-check-input"
                        id="terms"
                        as={FormCheck.Input}
                      />
                      <BootstrapForm.Label
                        className="form-check-label"
                        htmlFor="terms"
                      >
                        I agree with Terms of Use and Privacy Policy
                      </BootstrapForm.Label>
                      <ErrorMessage
                        name="terms"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="d-grid">
                      <Button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Sign Up"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="mt-3 text-center">
                Already have an account? <a href="/login">Login</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
