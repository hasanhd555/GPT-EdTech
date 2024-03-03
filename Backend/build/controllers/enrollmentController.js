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
exports.getCoursesForUser = void 0;
const enrollment_1 = __importDefault(require("../models/enrollment"));
require("../models/course");
// This function will retrieve all courses for a given user
const getCoursesForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Assuming that 'user_id' is passed as a parameter in the request
        const { user_id } = req.body;
        console.log(user_id);
        // Find all enrollments for the user and populate the course details
        const enrollments = yield enrollment_1.default.find({ user_id: user_id }).populate('course_id').exec();
        console.log(enrollments);
        // Extract the course details from the enrollments
        const courses = enrollments.map(enrollment => enrollment.course_id);
        // Send the course details as a response
        res.status(200).json(courses);
    }
    catch (error) {
        // If an error occurs, send an error message
        const errorMessage = error.message;
        res.status(500).json({ message: errorMessage });
    }
});
exports.getCoursesForUser = getCoursesForUser;
