import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form as BootstrapForm,
  InputGroup,
  FormCheck,
} from "react-bootstrap"; // Import React Bootstrap components
// import validationSchema from "../Schemas/validationSchema";
import * as yup from "yup";

interface SignUpFormProps {
  // Define any props you might need here
}

type RoleName = "admin" | "student";

const validationSchemas = {
  admin: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6, "Password must be at least 6 characters long"),
    role: yup.string().required(),
    terms: yup.boolean().oneOf([true], "Terms must be accepted"),
  }),
  student: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6, "Password must be at least 6 characters long"),
    fullName: yup.string().required(),
    username: yup.string().required(),
    age: yup.number().positive().integer().required(),
    gender: yup.string().required(),
    role: yup.string().required(),
    terms: yup.boolean().oneOf([true], "Terms must be accepted"),
  }),
};

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const defaultRole: RoleName = "student";
  const [passwordShown, setPasswordShown] = useState(false);
  const [studentCredentialsShown, setStudentCredentialsShown] = useState(true);
  const [selectedRole, setSelectedRole] = useState<RoleName>(defaultRole);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value as RoleName);
    if (e.target.value === "admin") {
      setStudentCredentialsShown(false);
    } else {
      setStudentCredentialsShown(true);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown((passwordShown: boolean) => !passwordShown);
  };

  const handleSubmit = (values: any, actions: any) => {
    // Select the validation schema based on the selected role
    const schema = validationSchemas[selectedRole];
    // Validate the form values against the selected schema
    schema
      .validate(values, { abortEarly: false }) // abortEarly: false ensures all errors are shown
      .then(() => {
        // Handle successful validation
        console.log(values);

        // Construct the data to be sent in the API call
        const requestData = {
          email: values.email,
          password: values.password,
          // Add other fields based on the selected role
          ...(selectedRole === "student"
            ? {
                fullName: values.fullName,
                username: values.username,
                age: values.age,
                gender: values.gender,
              }
            : {}),
        };

        // Make API call based on the selected role
        if (selectedRole === "admin") {
          // API call for admin registration
          // Example using fetch:
          fetch("http://localhost:5001/api/admin/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              window.alert("Signup successful!");
            })
            .catch((error) => console.error("Error:", error));
        } else if (selectedRole === "student") {
          // API call for student registration
          // Example using fetch:
          fetch("http://localhost:5001/api/student/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              window.alert("Signup successful!");
            })
            .catch((error) => console.error("Error:", error));
        }

        actions.setSubmitting(false); // Uncomment this line if you want to stop the loading spinner
      })
      .catch((errors: yup.ValidationError) => {
        // Handle validation errors
        actions.setErrors(errors);
        actions.setSubmitting(false);
      });
  };

  return (
    <Container fluid className="mt-5 mb-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
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
                  role: defaultRole,
                }}
                validationSchema={validationSchemas[selectedRole]}
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
                    {studentCredentialsShown && (
                      <>
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
                        <div
                          role="group"
                          className="mb-3"
                          aria-labelledby="gender-group"
                        >
                          <BootstrapForm.Label className="mr-3">
                            Gender
                          </BootstrapForm.Label>
                          <div className="d-flex">
                            {" "}
                            <div>
                              <Field
                                name="gender"
                                type="radio"
                                value="male"
                                as={BootstrapForm.Check}
                                id="male"
                                label="Male"
                              />
                            </div>
                            <div className="mx-3">
                              <Field
                                name="gender"
                                type="radio"
                                value="female"
                                as={BootstrapForm.Check}
                                id="female"
                                label="Female"
                              />
                            </div>
                          </div>
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </>
                    )}
                    <div
                      role="group"
                      className="mb-3"
                      aria-labelledby="role-group"
                    >
                      <BootstrapForm.Label className="mr-3">
                        Role
                      </BootstrapForm.Label>
                      <div className="d-flex">
                        {" "}
                        <div>
                          <Field
                            name="role"
                            type="radio"
                            value="admin"
                            as={BootstrapForm.Check}
                            id="admin"
                            label="admin"
                            onClick={handleRoleChange}
                          />
                        </div>
                        <div className="mx-3">
                          <Field
                            name="role"
                            type="radio"
                            value="student"
                            as={BootstrapForm.Check}
                            id="student"
                            label="student"
                            onClick={handleRoleChange}
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="role"
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
