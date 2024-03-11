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
import { SignUpData } from "../../../constant";
import { handleLogin, handleSignup } from "../Auth_APIs";
import { useAppDispatch,useAppSelector } from "../../../redux/hooks";
import { setUserData,clearUserData } from "../../../redux/slices/User_Slice";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal"

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
  const [ErrorMsg,SetErrorMsg]=useState("Initial error");
  const [SignUpErr,SetSignUpErr]=useState(false)
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

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

  const handleSubmit = async (values: any, actions: any) => {
    try {
      SetSignUpErr(false);
      const schema = validationSchemas[selectedRole];
  
      await schema.validate(values, { abortEarly: false });
  
      console.log(values);
  
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
  
      const response = await handleSignup(requestData, selectedRole);
  
      if (response.error) {
        SetErrorMsg(response.error);
        SetSignUpErr(true);
      } else {
        console.log("success: ", response);
        const { email, password } = values;
        console.log("email,password after signup",email,password)
        // Handle the promise returned by handleLogin
        const Login_response = await handleLogin(email, password, selectedRole);
  
        // Ensure the response body is resolved to handle the pending promise
        const responseBody = await Promise.resolve(Login_response.json());
  
        if (Login_response.ok) {
          const userData = responseBody;
          const _id = userData["_id"];
          const userEmail = userData["email"];
          dispatch(setUserData({ isAdmin: selectedRole === "admin", email: userEmail, _id: _id }));
          actions.setSubmitting(false);
          navigate("/");
          console.log("navigated");
        } else {
          // Handle non-ok status (e.g., 401 error)
          SetErrorMsg("Login failed. Please check your credentials.");
          SetSignUpErr(true);
        }
      }
    } catch (error:any) {
      // Handle errors from the fetch or the error thrown in the success block
      SetErrorMsg(error.message);
      SetSignUpErr(true);
    } finally {
      actions.setSubmitting(false);
    }
  };
  
  
  

  return (
    <Container fluid className="mt-5 mb-5">
      {SignUpErr && <div className="alert alert-danger text-center" role="alert">
      {ErrorMsg}!
      </div>}
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
                    <Modal show={SignUpErr} onHide={() => SetSignUpErr(false)} centered>
                        <Modal.Header closeButton>
                          <Modal.Title>Error</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{ErrorMsg}</Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" onClick={() => SetSignUpErr(false)}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
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
