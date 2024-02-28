import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Student from "../models/student";
import { student_type } from "../Constant";
import { v2 as cloudinary } from "cloudinary";

// Get one specific student
export const getOneStudent = async (req: Request, res: Response) => {
  try {
    console.log("In get 1 student function");
    const studentId = req.query.id;
    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Student not found" });
    }
    res.status(StatusCodes.OK).json(student);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Get all students
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    console.log("In student getall");
    const students = await Student.find();
    res.status(StatusCodes.OK).json(students);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Student signup
export const signup = async (req: Request, res: Response) => {
  try {
    console.log("In student signup");
    const { username, email, password, name, age, gender, profile_picture } =
      req.body;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Email already in use" });
    }
    const objStudent: student_type = {
      username,
      email,
      password,
      name,
      age,
      gender,
      profile_picture,
    };
    const student = await Student.create(objStudent);
    res.status(StatusCodes.CREATED).json(student);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Student login
export const login = async (req: Request, res: Response) => {
  try {
    console.log("In student login");
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    const validPassword = await student?.isPasswordValid(password);
    if (!validPassword) {
      console.log("FunctionReturns", student?.isPasswordValid(password));
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid credentials" });
    }
    res.status(StatusCodes.OK).json(student);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Update a specific student
export const updateStudent = async (req: Request, res: Response) => {
  const { id, ...updateData } = req.body; // Destructure the ID from the body

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Student not found" });
    }
    // Update the Student object with new data
    Object.assign(student, updateData);
    // Save the updated Student, triggering pre-save hooks
    const updatedStudent = await student.save();
    res.status(StatusCodes.OK).json(updatedStudent);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Cloudinary configuration (usually you would place this in a separate config file)
cloudinary.config({
  cloud_name: "do2hqf8du",
  api_key: "458569939539534",
  api_secret: "4LkbMXSeh-CG58fZPRWv12Tit6U",
  secure: true,
});

// Endpoint to upload image to Cloudinary
export const uploadImage = async (req: Request, res: Response) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "gpt_edtech360",
    });
    res.json({ url: uploadResponse.url });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while uploading the image" });
  }
};
