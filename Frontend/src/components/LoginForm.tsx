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
  role: yup
  .mixed()
  .oneOf(['admin', 'student'], "Role is required")
  .required("Role is required")
});

interface LoginFormProps {
  // Define any props you might need here
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [Role,setRole] =useState("")
  const [Inval_cred,setInval_cred]=useState(false)
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown((passwordShown: boolean) => !passwordShown);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    
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
    console.log("response",response)
    const errorData = await response.json();
    console.error("Login failed:", errorData);
    //alert(`login failed: ${errorData}`);

    // You can also handle specific error cases here
    if (response.status === 401) {
      // Unauthorized - Invalid credentials
      // Display an error message to the user
      console.log("401 error");
      setInval_cred(true)
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
      const { email, password } = values;
      const role = Role;
  
      let loginResponse;
  
      if (role === "admin") {
        console.log("submitted for admin")
        loginResponse = await handleAdminLogin(email, password);
      } else if (role === "student") {
        console.log("submitted for student")
        loginResponse = await handleStudentLogin(email, password);
      }
  
      if (loginResponse && loginResponse.ok) {
        const userData = await loginResponse.json();
        const _id = userData["_id"];
        const userEmail = userData["email"];
        dispatch(setUserData({ isAdmin: role === "admin", email: userEmail, _id: _id }));
        actions.setSubmitting(false);
        navigate("/")
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
  

  return (
    <Container fluid className="mt-5 mb-5 w-100">
      {Inval_cred && <div className="alert alert-danger" role="alert">
      Login failed. Invalid Credentials!
      </div>}
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
