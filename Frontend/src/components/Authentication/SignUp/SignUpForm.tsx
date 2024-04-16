import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik components for form management
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
import * as yup from "yup"; // Import yup for validation
import { SignUpData } from "../../../constant"; // Import constant data for sign-up
import { handleLogin, handleSignup } from "../Auth_APIs"; // Import API functions for login and signup
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"; // Import custom Redux hooks
import { setUserData, clearUserData } from "../../../redux/slices/User_Slice"; // Import Redux actions
import { NavigateFunction, useNavigate } from "react-router-dom"; // Import React Router DOM hooks for navigation
import Modal from "react-bootstrap/Modal"; // Import React Bootstrap modal component

// Define props interface for SignUpForm component
interface SignUpFormProps {
  // Define any props you might need here
}

// Define types for role names
type RoleName = "admin" | "student";

// Regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Define validation schemas for admin and student roles
const validationSchemas = {
  admin: yup.object().shape({
    email: yup.string().email().required(), // Email validation
    password: yup.string()
                 .required("Password is required")
                 .min(6, "Password must be at least 6 characters long")
                 .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must contain both letters and numbers"), // Password validation
    role: yup.string().required(), // Role validation
    terms: yup.boolean().oneOf([true], "Terms must be accepted"), // Terms validation
  }),
  student: yup.object().shape({
    email: yup.string().email().required(), // Email validation
    password: yup.string()
                 .required("Password is required")
                 .min(6, "Password must be at least 6 characters long")
                 .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must contain both letters and numbers"), // Password validation
    fullName: yup.string().required(), // Full name validation
    username: yup.string().required(), // Username validation
    age: yup.number().positive().integer().required(), // Age validation
    gender: yup.string().required(), // Gender validation
    role: yup.string().required(), // Role validation
    terms: yup.boolean().oneOf([true], "Terms must be accepted"), // Terms validation
  }),
};

// Define SignUpForm functional component
const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  // State variables
  const defaultRole: RoleName = "student"; // Default role
  const [passwordShown, setPasswordShown] = useState(false); // State to toggle password visibility
  const [studentCredentialsShown, setStudentCredentialsShown] = useState(true); // State to manage visibility of student-specific fields
  const [selectedRole, setSelectedRole] = useState<RoleName>(defaultRole); // State to manage selected role
  const [ErrorMsg, SetErrorMsg] = useState("Initial error"); // State for error message
  const [SignUpErr, SetSignUpErr] = useState(false); // State for sign-up error
  const dispatch = useAppDispatch(); // Redux dispatch hook
  const navigate: NavigateFunction = useNavigate(); // React Router DOM navigation hook

  // Function to handle role change
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value as RoleName);
    if (e.target.value === "admin") {
      setStudentCredentialsShown(false);
    } else {
      setStudentCredentialsShown(true);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordShown((passwordShown: boolean) => !passwordShown);
  };

  // Function to handle form submission
  const handleSubmit = async (values: any, actions: any) => {
    try {
      SetSignUpErr(false);
      const schema = validationSchemas[selectedRole]; // Get validation schema based on selected role

      // Validate form values
      await schema.validate(values, { abortEarly: false });

      // Prepare request data based on selected role
      const requestData: SignUpData = {
        email: values.email,
        password: values.password,
        ...(selectedRole === "student"
          ? {
              fullName: values.fullName,
              username: values.username,
              age: values.age,
              gender: values.gender,
            }
          : {}),
      };

      // Send sign-up request
      const response = await handleSignup(requestData, selectedRole);

      // Handle sign-up response
      if (response.error) {
        SetErrorMsg(response.error);
        SetSignUpErr(true);
      } else {
        // If sign-up is successful, attempt login
        const { email, password } = values;
        const Login_response = await handleLogin(email, password, selectedRole);
        const responseBody = await Promise.resolve(Login_response.json());

        // If login is successful, set user data in Redux and navigate to home page
        if (Login_response.ok) {
          const userData = responseBody;
          const _id = userData["_id"];
          const userEmail = userData["email"];
          dispatch(setUserData({ isAdmin: selectedRole === "admin", email: userEmail, _id: _id }));
          actions.setSubmitting(false);
          navigate("/");
        } else {
          // Handle login failure
          SetErrorMsg("Login failed. Please check your credentials.");
          SetSignUpErr(true);
        }
      }
    } catch (error: any) {
      // Handle form validation errors
      SetErrorMsg(error.message);
      SetSignUpErr(true);
    } finally {
      actions.setSubmitting(false);
    }
  };

  // Render the SignUpForm component
  return (
    <Container fluid className="mt-5 mb-5">
      {/* Display error message for sign-up errors */}
      {SignUpErr && (
        <div className="alert alert-danger text-center" role="alert">
          {ErrorMsg}!
        </div>
      )}
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
                validationSchema={validationSchemas[selectedRole]} // Set validation schema based on selected role
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      {/* Email field */}
                      <BootstrapForm.Label>Email <span className="text-danger">*</span></BootstrapForm.Label>
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
                      {/* Password field */}
                      <BootstrapForm.Label>Password <span className="text-danger">*</span></BootstrapForm.Label>
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
                        {/* Student-specific fields */}
                        <div className="mb-3">
                          <BootstrapForm.Label>Full Name <span className="text-danger">*</span></BootstrapForm.Label>
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
                          <BootstrapForm.Label>Username <span className="text-danger">*</span></BootstrapForm.Label>
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
                          <BootstrapForm.Label>Age <span className="text-danger">*</span></BootstrapForm.Label>
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
                            Gender <span className="text-danger">*</span>
                          </BootstrapForm.Label>
                          <div className="d-flex">
                            {" "}
                            <div>
                              {/* Gender radio buttons */}
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
                    {/* Role selection */}
                    <div
                      role="group"
                      className="mb-3"
                      aria-labelledby="role-group"
                    >
                      <BootstrapForm.Label className="mr-3">
                        Role <span className="text-danger">*</span>
                      </BootstrapForm.Label>
                      <div className="d-flex">
                        {" "}
                        <div>
                          {/* Admin radio button */}
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
                          {/* Student radio button */}
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
                    {/* Terms acceptance */}
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
                        I agree with Terms of Use and Privacy Policy <span className="text-danger">*</span>
                      </BootstrapForm.Label>
                      <ErrorMessage
                        name="terms"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    {/* Submit button */}
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
              {/* Link to login page */}
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
