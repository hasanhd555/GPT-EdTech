"use strict";
// courseController.ts
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
exports.createCourse = exports.serchCourseByName = exports.getCourseById = exports.getAllCourses = void 0;
const http_status_codes_1 = require("http-status-codes");
const course_1 = __importDefault(require("../models/course"));
const lesson_1 = __importDefault(require("../models/lesson")); // Assuming you have this model
const question_1 = __importDefault(require("../models/question")); // Assuming you have this model
// Get all courses
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_1.default.find();
        res.status(http_status_codes_1.StatusCodes.OK).json(courses);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.getAllCourses = getAllCourses;
// Get a specific course by ID
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const course = yield course_1.default.findById(id);
        if (!course) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ error: "Course not found" });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(course);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.getCourseById = getCourseById;
const serchCourseByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req === null || req === void 0 ? void 0 : req.body;
        console.log("name = ", name);
        // Query the database to find similar courses based on the course name
        if (name) {
            const similarCourses = yield course_1.default.find({
                title: { $regex: new RegExp(name, "i") }, // Case-insensitive search for courses with similar title
            });
            if (!similarCourses) {
                return res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .json({ error: "No Course Found" });
            }
            res.status(http_status_codes_1.StatusCodes.OK).json(similarCourses);
        }
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.serchCourseByName = serchCourseByName;
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In createCourse", req.body);
        const { adminId, name, description, lessons, quizQuestions } = req.body;
        // Step 0: Create the course without lessons and quiz questions initially
        const course = new course_1.default({
            title: name,
            description,
            admin_id: adminId,
            // Assuming an image_url field is required; use a placeholder or actual URL as needed
            image_url: "https://via.placeholder.com/150",
        });
        const savedCourse = yield course.save();
        // Step 1: Create and store lessons with the course_id
        if (lessons && lessons.length) {
            const createdLessons = yield Promise.all(lessons.map((lesson) => new lesson_1.default(Object.assign(Object.assign({}, lesson), { course_id: savedCourse._id })).save()));
            // Optionally, link lessons to the course here if your schema supports it
        }
        // Step 2: Create and store questions with the course_id
        if (quizQuestions && quizQuestions.length) {
            const createdQuestions = yield Promise.all(quizQuestions.map((question) => new question_1.default({
                question_text: question.question,
                correct_answer: question.correctOption + 1,
                options: question.options,
                course_id: savedCourse._id,
                concept: "Placeholder Concept", // Assuming 'concept' is required; adjust as necessary
            }).save()));
            // Optionally, link questions to the course here if your schema supports it
        }
        // Optionally, you might want to update the course with references to the created lessons and questions
        res.status(http_status_codes_1.StatusCodes.CREATED).json(savedCourse);
    }
    catch (error) {
        console.error('Error creating course:', error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
});
exports.createCourse = createCourse;
module.exports = {
    getAllCourses: exports.getAllCourses,
    getCourseById: exports.getCourseById,
    serchCourseByName: exports.serchCourseByName,
    createCourse: exports.createCourse
};
