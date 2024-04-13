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
exports.updateImage = exports.getCourseAnalytics = exports.updateDetails = exports.getCourseAllInfo = exports.getEditableCourses = exports.createCourse = exports.serchCourseByName = exports.getCourseById = exports.getAllCourses = void 0;
const http_status_codes_1 = require("http-status-codes");
const course_1 = __importDefault(require("../models/course"));
const lesson_1 = __importDefault(require("../models/lesson"));
const question_1 = __importDefault(require("../models/question"));
const enrollment_1 = __importDefault(require("../models/enrollment"));
const student_1 = __importDefault(require("../models/student"));
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
        const { adminId, name, description, lessons, quizQuestions, image_url } = req.body;
        // Step 0: Create the course without lessons and quiz questions initially
        const course = new course_1.default({
            title: name,
            description,
            admin_id: adminId,
            image_url: image_url || "https://via.placeholder.com/150",
        });
        const savedCourse = yield course.save();
        // Step 1: Create and store lessons with the course_id
        if (lessons && lessons.length) {
            const createdLessons = yield Promise.all(lessons.map((lesson, index) => new lesson_1.default(Object.assign(Object.assign({}, lesson), { lesson_num: index + 1, course_id: savedCourse._id // Now we have the saved course ID to associate
             })).save()));
        }
        // Step 2: Create and store questions with the course_id
        if (quizQuestions && quizQuestions.length) {
            const createdQuestions = yield Promise.all(quizQuestions.map((question) => new question_1.default({
                question_text: question.question,
                correct_answer: question.correctOption + 1,
                options: question.options,
                course_id: savedCourse._id,
                concept: question.concept, // Assuming 'concept' is required; adjust as necessary
            }).save()));
            // Optionally, link questions to the course here if your schema supports it
        }
        // Optionally, you might want to update the course with references to the created lessons and questions
        res.status(http_status_codes_1.StatusCodes.CREATED).json(savedCourse);
    }
    catch (error) {
        console.error("Error creating course:", error);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.createCourse = createCourse;
const getEditableCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In getEditableCourses", req.query);
        const adminId = req.query.adminId; // Assuming adminId is sent as a query parameter
        if (!adminId) {
            return res.status(400).json({ error: 'Admin ID is required' });
        }
        // Query the database for courses with the matching admin_id
        const courses = yield course_1.default.find({ admin_id: adminId });
        // If no courses are found, return an appropriate message
        if (courses.length === 0) {
            return res.status(404).json({ message: 'No courses found for this admin' });
        }
        // Return the found courses
        res.status(200).json(courses);
    }
    catch (error) {
        // Log the error and return a generic server error response
        console.error('Error fetching editable courses:', error);
        res.status(500).json({ error: 'Server error while fetching courses' });
    }
});
exports.getEditableCourses = getEditableCourses;
const getCourseAllInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In getEditableCourses", req.query);
        const id = req.query.courseId;
        const course = yield course_1.default.findById(id);
        // if (!course) {
        //   return res
        //     .status(StatusCodes.NOT_FOUND)
        //     .json({ error: "Course not found" });
        // }
        if (!course) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "Course not found" });
        }
        // Check if the course has an image_url, otherwise, provide a default
        const imageUrl = course.image_url;
        // Fetch lessons and questions associated with the course
        const lessons = yield lesson_1.default.find({ course_id: course === null || course === void 0 ? void 0 : course._id });
        const questions = yield question_1.default.find({ course_id: course === null || course === void 0 ? void 0 : course._id });
        // Return the course along with lessons and questions
        res.status(http_status_codes_1.StatusCodes.OK).json({ course, lessons, questions, imageUrl });
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.getCourseAllInfo = getCourseAllInfo;
const updateDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params; // Assuming you're passing the course ID as a URL parameter
    const { title, description, image_url } = req.body;
    console.log("In updateDetails", req.body, courseId);
    try {
        const updatedCourse = yield course_1.default.findByIdAndUpdate(courseId, { title, description, image_url }, { new: true } // Return the updated document
        );
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(updatedCourse);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.updateDetails = updateDetails;
const getCourseAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In getCourseAnalytics", req.query);
        const courseId = req.query.courseId;
        if (!courseId) {
            return res.status(400).json({ error: "Course ID is required" });
        }
        // Find all enrollments for the course
        const enrollments = yield enrollment_1.default.find({ course_id: courseId }).lean();
        // Map each enrollment to include student name and ID
        const analytics = yield Promise.all(enrollments.map((enrollment) => __awaiter(void 0, void 0, void 0, function* () {
            // Find the corresponding student
            const student = yield student_1.default.findById(enrollment.user_id).lean();
            if (!student) {
                return {
                    studentId: 'Unknown ID', // Consider handling unknown IDs differently or omitting these records
                    studentName: 'Unknown',
                    points: enrollment.points,
                };
            }
            // Combine the student's ID, name with the enrollment's points
            return {
                studentId: student._id,
                studentName: student.name,
                points: enrollment.points,
            };
        })));
        res.json({ analytics });
    }
    catch (error) {
        console.error("Error fetching course analytics:", error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.getCourseAnalytics = getCourseAnalytics;
const updateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, imageUrl } = req.body;
    if (!courseId || !imageUrl) {
        return res.status(400).json({ message: 'Course ID and new image URL are required.' });
    }
    try {
        const updatedCourse = yield course_1.default.findByIdAndUpdate(courseId, { image_url: imageUrl }, { new: true, runValidators: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.status(200).json({ message: 'Course image updated successfully.', data: updatedCourse });
    }
    catch (error) { // Using unknown type for error which is safer than any
        console.error('Update image error:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating course image.', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error updating course image.', error: 'Unknown error' });
        }
    }
});
exports.updateImage = updateImage;
module.exports = {
    getAllCourses: exports.getAllCourses,
    getCourseById: exports.getCourseById,
    serchCourseByName: exports.serchCourseByName,
    createCourse: exports.createCourse,
    getEditableCourses: exports.getEditableCourses,
    getCourseAllInfo: exports.getCourseAllInfo,
    updateDetails: exports.updateDetails,
    getCourseAnalytics: exports.getCourseAnalytics,
    updateImage: exports.updateImage,
};
