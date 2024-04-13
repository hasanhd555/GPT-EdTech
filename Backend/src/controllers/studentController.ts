import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Student from "../models/student";
import { CloudinarBaseImageUrl, student_type } from "../Constant";
import { v2 as cloudinary } from "cloudinary";

// Retrieves a specific student by ID
export const getOneStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.query.id; // Extracting student ID from query parameters
    const student = await Student.findById(studentId);
    if (!student) {
      // If no student found, return 404 Not Found
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Student not found" });
    }
    // Send the found student back with 200 OK
    res.status(StatusCodes.OK).json(student);
  } catch (error) {
    // Handle errors with a 500 Internal Server Error
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Fetches all students from the database
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find(); // Retrieve all students
    res.status(StatusCodes.OK).json(students); // Respond with the list of all students
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Handles student registration
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, username, age, gender } = req.body; // Destructure required fields from the body

    // Check if a student with the same email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      // If the email is already used, return 409 Conflict
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Email already in use" });
    }
    // Create a new student object
    const objStudent: student_type = {
      username,
      email,
      password,
      name: fullName,
      age,
      gender,
      profile_picture: CloudinarBaseImageUrl,
    };
    const student = new Student(objStudent);
    await student.save(); // Save the new student to the database

    res.status(StatusCodes.CREATED).json(student); // Return the newly created student
  } catch (error) {
    console.log("Cannot Signup", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Handles student login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body
    const student = await Student.findOne({ email });
    const validPassword = await student?.isPasswordValid(password);
    if (!validPassword) {
      // If password is invalid, return 401 Unauthorized
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid credentials" });
    }
    res.status(StatusCodes.OK).json(student); // Respond with the student details on successful login
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Updates the details of a specific student
export const updateStudent = async (req: Request, res: Response) => {
  const { id, ...updateData } = req.body; // Extract student ID and update data from body

  try {
    const student = await Student.findById(id);
    if (!student) {
      // If student is not found, return 404 Not Found
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Student not found" });
    }
    Object.assign(student, updateData); // Update the student object with new data
    const updatedStudent = await student.save(); // Save the updated student
    res.status(StatusCodes.OK).json(updatedStudent); // Return the updated student
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Cloudinary configuration should ideally be placed in a separate configuration file
cloudinary.config({
  cloud_name: "do2hqf8du",
  api_key: "458569939539534",
  api_secret: "4LkbMXSeh-CG58fZPRWv12Tit6U",
  secure: true,
});

// Endpoint to upload an image to Cloudinary
export const uploadImage = async (req: Request, res: Response) => {
  try {
    const fileStr = req.body.data; // Get the image data from request body
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "gpt_edtech360",
    });
    res.json({ url: uploadResponse.url }); // Return the URL of the uploaded image
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while uploading the image" });
  }
};
