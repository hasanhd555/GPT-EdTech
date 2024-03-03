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
const cloudinary_1 = require("cloudinary");
// Get one specific student
const getOneStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In get 1 student function");
        const studentId = req.query.id;
        const student = yield student_1.default.findById(studentId);
        if (!student) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ error: "Student not found" });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(student);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.getOneStudent = getOneStudent;
// Get all students
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In student getall");
        const students = yield student_1.default.find();
        res.status(http_status_codes_1.StatusCodes.OK).json(students);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.getAllStudents = getAllStudents;
// Student signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In student signup");
        const { email, password, fullName, username, age, gender } = req.body;
        const existingStudent = yield student_1.default.findOne({ email });
        if (existingStudent) {
            return res
                .status(http_status_codes_1.StatusCodes.CONFLICT)
                .json({ error: "Email already in use" });
        }
        const objStudent = {
            username: username,
            email: email,
            password: password,
            name: fullName,
            age: age,
            gender: gender,
            profile_picture: "http://res.cloudinary.com/do2hqf8du/image/upload/v1709494602/jhprjpcx0k75zfyqmnry.svg",
        };
        const student = new student_1.default(objStudent);
        yield student.save();
        res.status(http_status_codes_1.StatusCodes.CREATED).json(student);
    }
    catch (error) {
        console.log("Cannot Signup", error);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.signup = signup;
// Student login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In student login");
        const { email, password } = req.body;
        const student = yield student_1.default.findOne({ email });
        const validPassword = yield (student === null || student === void 0 ? void 0 : student.isPasswordValid(password));
        if (!validPassword) {
            console.log("FunctionReturns", student === null || student === void 0 ? void 0 : student.isPasswordValid(password));
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ error: "Invalid credentials" });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(student);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.login = login;
// Update a specific student
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id } = _a, updateData = __rest(_a, ["id"]); // Destructure the ID from the body
    try {
        const student = yield student_1.default.findById(id);
        if (!student) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ error: "Student not found" });
        }
        // Update the Student object with new data
        Object.assign(student, updateData);
        // Save the updated Student, triggering pre-save hooks
        const updatedStudent = yield student.save();
        res.status(http_status_codes_1.StatusCodes.OK).json(updatedStudent);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.updateStudent = updateStudent;
// Cloudinary configuration (usually you would place this in a separate config file)
cloudinary_1.v2.config({
    cloud_name: "do2hqf8du",
    api_key: "458569939539534",
    api_secret: "4LkbMXSeh-CG58fZPRWv12Tit6U",
    secure: true,
});
// Endpoint to upload image to Cloudinary
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileStr = req.body.data;
        const uploadResponse = yield cloudinary_1.v2.uploader.upload(fileStr, {
            upload_preset: "gpt_edtech360",
        });
        res.json({ url: uploadResponse.url });
    }
    catch (error) {
        console.error(error);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "An error occurred while uploading the image" });
    }
});
exports.uploadImage = uploadImage;
