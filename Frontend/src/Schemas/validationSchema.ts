import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    age: Yup.number().positive("Age must be a positive number").required("Age is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
    terms: Yup.boolean().oneOf([true], "You must accept Terms of Use and Privacy Policy")
  });

export default validationSchema;