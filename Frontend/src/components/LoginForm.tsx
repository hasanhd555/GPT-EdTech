import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
import { useAppDispatch, useAppSelector } from "../redux/hooks/index";
import { setUserData, clearUserData } from "../redux/slices/User_Slice";
import { NavigateFunction, useNavigate } from "react-router-dom";
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
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown((passwordShown: boolean) => !passwordShown);
  };

  const handleAdminLogin = async (email: any, password: any) => {
    // Make a POST request to the admin login endpoint
    const response = await fetch("http://localhost:5001/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response;
  };

  const handleStudentLogin = async (email: any, password: any) => {
    // Make a POST request to the student login endpoint
    const response = await fetch("http://localhost:5001/api/student/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log("response.bosy student:", response.body);

    return response;
  };

  const handleServerError = async (response: any, actions: any) => {
    // Handle the case where the server returns an error
    const errorData = await response.json();
    console.error("Login failed:", errorData);
    alert(`login failed: ${errorData}`);

    // You can also handle specific error cases here
    if (response.status === 401) {
      // Unauthorized - Invalid credentials
      // Display an error message to the user
      console.log("401 error");

      // Check if the error message indicates a student
      if (errorData && errorData.role === "student") {
        // Handle student login logic here
        console.log("Login failed for student");
      } else {
        // Handle other unauthorized cases
        console.log("Unauthorized access");
      }
    } else {
      // Other server errors
      // Display a generic error message to the user
      console.log("Error");
    }

    // Set submitting to false to enable the form
    actions.setSubmitting(false);
  };

  const handleSubmit = async (values: any, actions: any) => {
    try {
      // Extract email and password from form values
      const { email, password } = values;
      console.log(values);

      // Attempt admin login
      const adminResponse = await handleAdminLogin(email, password);

      // Check if the admin login was successful
      if (adminResponse.ok) {
        // Parse the response JSON
        const adminData = await adminResponse.json();
        console.log("Admin login successful:", adminData);
        const _id = adminData["_id"];
        const email = adminData["email"];
        dispatch(setUserData({ isAdmin: true, email: email, _id: _id }));
      } else {
        // Handle server errors for admin
        await handleServerError(adminResponse, actions);

        // If it's a 401 error, attempt student login
        if (adminResponse.status === 401) {
          const studentResponse = await handleStudentLogin(email, password);

          // Check if the student login was successful
          if (studentResponse.ok) {
            // Parse the response JSON for student
            const studentData = await studentResponse.json();
            console.log("Student login successful:", studentData);
            const _id = studentData["_id"];
            const email = studentData["email"];
            dispatch(setUserData({ isAdmin: false, email: email, _id: _id }));
          } else {
            // Handle server errors for student
            await handleServerError(studentResponse, actions);
          }
        }
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Unexpected error:", error);
    } finally {
      // Set submitting to false to enable the form
      actions.setSubmitting(false);
      navigate("/");
    }
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
