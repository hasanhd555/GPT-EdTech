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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = exports.getAllStudents = exports.getOneStudent = void 0;
const http_status_codes_1 = require("http-status-codes");
const student_1 = __importDefault(require("../models/student"));
// Get one specific student
const getOneStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In get 1 student function");
        const studentId = req.query.id;
        const student = yield student_1.default.findById(studentId);
        if (!student) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "Student not found" });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(student);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
});
exports.getOneStudent = getOneStudent;
// Get all students
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield student_1.default.find();
        res.status(http_status_codes_1.StatusCodes.OK).json(students);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
});
exports.getAllStudents = getAllStudents;
// Student signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In student signup");
        const { username, email, password, name, age, gender, profile_picture } = req.body;
        const existingStudent = yield student_1.default.findOne({ email });
        if (existingStudent) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ error: "Email already in use" });
        }
        const student = yield student_1.default.create({ username, email, password, name, age, gender, profile_picture });
        res.status(http_status_codes_1.StatusCodes.CREATED).json(student);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
});
exports.signup = signup;
// Student login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const student = yield student_1.default.findOne({ email });
        if (!student || student.password !== password) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials" });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(student);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
});
exports.login = login;
