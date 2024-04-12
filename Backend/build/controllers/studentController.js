"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.updateStudent = exports.login = exports.signup = exports.getAllStudents = exports.getOneStudent = void 0;
const http_status_codes_1 = require("http-status-codes");
const student_1 = __importDefault(require("../models/student"));
const Constant_1 = require("../Constant");
const cloudinary_1 = require("cloudinary");
// Retrieves a specific student by ID
const getOneStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.query.id; // Extracting student ID from query parameters
        const student = yield student_1.default.findById(studentId);
        if (!student) {
            // If no student found, return 404 Not Found
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ error: "Student not found" });
        }
        // Send the found student back with 200 OK
        res.status(http_status_codes_1.StatusCodes.OK).json(student);
    }
    catch (error) {
        // Handle errors with a 500 Internal Server Error
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.getOneStudent = getOneStudent;
// Fetches all students from the database
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield student_1.default.find(); // Retrieve all students
        res.status(http_status_codes_1.StatusCodes.OK).json(students); // Respond with the list of all students
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.getAllStudents = getAllStudents;
// Handles student registration
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, fullName, username, age, gender } = req.body; // Destructure required fields from the body
        // Check if a student with the same email already exists
        const existingStudent = yield student_1.default.findOne({ email });
        if (existingStudent) {
            // If the email is already used, return 409 Conflict
            return res
                .status(http_status_codes_1.StatusCodes.CONFLICT)
                .json({ error: "Email already in use" });
        }
        // Create a new student object
        const objStudent = {
            username,
            email,
            password,
            name: fullName,
            age,
            gender,
            profile_picture: Constant_1.CloudinarBaseImageUrl,
        };
        const student = new student_1.default(objStudent);
        yield student.save(); // Save the new student to the database
        res.status(http_status_codes_1.StatusCodes.CREATED).json(student); // Return the newly created student
    }
    catch (error) {
        console.log("Cannot Signup", error);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.signup = signup;
// Handles student login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body; // Extract email and password from request body
        const student = yield student_1.default.findOne({ email });
        const validPassword = yield (student === null || student === void 0 ? void 0 : student.isPasswordValid(password));
        if (!validPassword) {
            // If password is invalid, return 401 Unauthorized
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ error: "Invalid credentials" });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(student); // Respond with the student details on successful login
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.login = login;
// Updates the details of a specific student
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id } = _a, updateData = __rest(_a, ["id"]); // Extract student ID and update data from body
    try {
        const student = yield student_1.default.findById(id);
        if (!student) {
            // If student is not found, return 404 Not Found
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ error: "Student not found" });
        }
        Object.assign(student, updateData); // Update the student object with new data
        const updatedStudent = yield student.save(); // Save the updated student
        res.status(http_status_codes_1.StatusCodes.OK).json(updatedStudent); // Return the updated student
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.updateStudent = updateStudent;
// Cloudinary configuration should ideally be placed in a separate configuration file
cloudinary_1.v2.config({
    cloud_name: "do2hqf8du",
    api_key: "458569939539534",
    api_secret: "4LkbMXSeh-CG58fZPRWv12Tit6U",
    secure: true,
});
// Endpoint to upload an image to Cloudinary
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileStr = req.body.data; // Get the image data from request body
        const uploadResponse = yield cloudinary_1.v2.uploader.upload(fileStr, {
            upload_preset: "gpt_edtech360",
        });
        res.json({ url: uploadResponse.url }); // Return the URL of the uploaded image
    }
    catch (error) {
        console.error(error);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "An error occurred while uploading the image" });
    }
});
exports.uploadImage = uploadImage;
