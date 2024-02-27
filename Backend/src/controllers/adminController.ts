import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Admin from "../models/admin";

import { admin_type } from "../Constant";

// Get one specific admin
export const getOneAdmin = async (req: Request, res: Response) => {
  try {
    console.log("In get 1 Admin function");
    const adminId = req.query.id;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "admin not found" });
    }
    res.status(StatusCodes.OK).json(admin);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Get all admins
export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    console.log("In admin getall");
    const admins = await Admin.find();
    res.status(StatusCodes.OK).json(admins);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// admin signup
export const signup = async (req: Request, res: Response) => {
  try {
    console.log("In admin signup");
    const { email, password } = req.body;
    const existingadmin = await Admin.findOne({ email });
    if (existingadmin) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Email already in use" });
    }
    const objadmin: admin_type = {
      email,
      password,
    };
    const admin = await Admin.create(objadmin);
    res.status(StatusCodes.CREATED).json(admin);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// admin login
export const login = async (req: Request, res: Response) => {
  try {
    console.log("In admin login");
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    const isValidPassword = await admin?.isPasswordValid(password);
    if (!isValidPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid credentials" });
    }
    res.status(StatusCodes.OK).json(admin);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

// Update a specific admin
export const updateAdmin = async (req: Request, res: Response) => {
  const { id, ...updateData } = req.body; // Destructure the ID from the body

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "admin not found" });
    }
    // Update the admin object with new data
    Object.assign(admin, updateData);
    // Save the updated admin, triggering pre-save hooks
    const updatedAdmin = await admin.save();
    res.status(StatusCodes.OK).json(updatedAdmin);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};
