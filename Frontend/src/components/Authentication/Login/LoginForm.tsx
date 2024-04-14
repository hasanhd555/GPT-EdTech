import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik components for form management
import * as yup from "yup"; // Import yup for validation
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form as BootstrapForm,
  InputGroup,
} from "react-bootstrap"; // Import React Bootstrap components
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/index"; // Import custom Redux hooks
import { setUserData, clearUserData } from "../../../redux/slices/User_Slice"; // Import Redux actions
import { NavigateFunction, useNavigate } from "react-router-dom"; // Import React Router DOM hooks for navigation
import { handleLogin } from '../Auth_APIs'; // Import login API function

// Define validation schema using yup
const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  role: yup
    .mixed()
    .oneOf(['admin', 'student'], "Role is required")
    .required("Role is required")
});

// Define props interface for LoginForm component
interface LoginFormProps {
  // Define any props you might need here
}

// Define LoginForm functional component
const LoginForm: React.FC<LoginFormProps> = (props) => {
  // State variables
  const [passwordShown, setPasswordShown] = useState(false); // State to toggle password visibility
  const [Role, setRole] = useState(""); // State to manage selected role
  const [Inval_cred, setInval_cred] = useState(false); // State to manage invalid credentials error
  const dispatch = useAppDispatch(); // Redux dispatch hook
  const navigate: NavigateFunction = useNavigate(); // React Router DOM navigation hook

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordShown((passwordShown: boolean) => !passwordShown);
  };

  // Function to handle role change
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
  };

  // Function to handle server error
  const handleServerError = async (response: any, actions: any) => {
    console.log("response", response);
    const errorData = await response.json();
    console.error("Login failed:", errorData);

    // Handle specific error cases
    if (response.status === 401) {
      // Unauthorized - Invalid credentials
      console.log("401 error");
      setInval_cred(true);
    } else {
      console.log("Error");
    }

    // Set submitting to false to enable the form
    actions.setSubmitting(false);
  };

  // Function to handle form submission
  const handleSubmit = async (values: any, actions: any) => {
    try {
      const { email, password } = values;
      const role = Role;

      let loginResponse = await handleLogin(email, password, role);

      if (loginResponse && loginResponse.ok) {
        const userData = await loginResponse.json();
        const _id = userData["_id"];
        const userEmail = userData["email"];
        dispatch(
          setUserData({ isAdmin: role === "admin", email: userEmail, _id: _id })
        );
        actions.setSubmitting(false);
        navigate("/");
        console.log("navigated");
      } else {
        await handleServerError(loginResponse, actions);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  // Render the LoginForm component
  return (
    <Container fluid className="mt-5 mb-5 w-100">
      {/* Display error message for invalid credentials */}
      {Inval_cred && (
        <div className="alert alert-danger text-center" role="alert">
          Login failed. Invalid Credentials!
        </div>
      )}
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
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
                  role: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {/* Email field */}
                    <div className="mb-3">
                      <BootstrapForm.Label>
                        Email <span className="text-danger">*</span>
                      </BootstrapForm.Label>
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
                    {/* Password field */}
                    <div className="mb-3">
                      <BootstrapForm.Label>
                        Password <span className="text-danger">*</span>
                      </BootstrapForm.Label>
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
                        <div>
                          {/* Admin role */}
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
                          {/* Student role */}
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
                    {/* Submit button */}
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
              {/* Sign up link */}
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
