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
const enrollment_1 = __importDefault(require("../models/enrollment")); // Adjust the path according to your project structure
const getCoursesForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extrating the user id
        const { user_id } = req.body;
        console.log(user_id);
        if (!user_id) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        // Fetching all enrollments for the user using user_id
        const enrollments = yield enrollment_1.default.find({ user_id: user_id });
        console.log(enrollments);
        const courseIds = enrollments.map(enrollment => enrollment.course_id);
        res.json({ user_id, courses: courseIds });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getCoursesForUser = getCoursesForUser;
