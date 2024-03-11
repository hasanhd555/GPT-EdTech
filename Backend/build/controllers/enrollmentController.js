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
exports.getTotalPoints = exports.enrollStudent = exports.setPoints = exports.getCourseEnrollement = exports.getCoursesForUser = void 0;
const enrollment_1 = __importDefault(require("../models/enrollment"));
require("../models/course");
// This function will retrieve all courses for a given user
const getCoursesForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Assuming that 'user_id' is passed as a parameter in the request
        const { user_id } = req.body;
        console.log(user_id);
        // Find all enrollments for the user and populate the course details
        const enrollments = yield enrollment_1.default.find({ user_id: user_id })
            .populate("course_id")
            .exec();
        console.log(enrollments);
        // Extract the course details from the enrollments
        const courses = enrollments.map((enrollment) => enrollment.course_id);
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
const getCourseEnrollement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, course_id } = req.body;
        // Find all enrollments for the user and populate the course details
        const enrollments = yield enrollment_1.default.find({
            user_id: user_id,
            course_id: course_id,
        });
        console.log(enrollments);
        // Check if enrollments were found
        if (enrollments.length === 0) {
            // No enrollments found, send an empty array as response
            res.status(200).json([]);
        }
        else {
            // Enrollments found, send them as response
            res.status(200).json(enrollments);
        }
    }
    catch (error) {
        // If an error occurs, send an error message
        const errorMessage = error.message;
        res.status(500).json({ message: errorMessage });
    }
});
exports.getCourseEnrollement = getCourseEnrollement;
const setPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, course_id, points } = req.body;
    // Find all enrollments for the user and populate the course details
    try {
        // Find the existing rating or create a new one if none exists
        let updatedEnrollement = yield enrollment_1.default.findOneAndUpdate({ user_id: user_id, course_id: course_id }, { points: points, completion_status: true }, { new: true, upsert: true } // Return the updated document and create it if it doesn't exist
        );
        res.status(200).json({
            message: "Enrollment Points and Status updated or created successfully",
        });
    }
    catch (error) {
        console.error("Error updating or creating Enrollment Points or Status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.setPoints = setPoints;
const enrollStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Assuming that 'user_id' is passed as a parameter in the request
        const { user_id, course_id } = req.body;
        // Find all enrollments for the user and populate the course details
        const newEnrollment = new enrollment_1.default({
            user_id: user_id,
            course_id: course_id,
            completion_status: false,
            points: 0,
        });
        const savedEnrollment = yield newEnrollment.save();
        // Send the saved enrollment as a response
        res.status(201).json(savedEnrollment);
    }
    catch (error) {
        // If an error occurs, send an error message
        console.error("Error saving enrollment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.enrollStudent = enrollStudent;
const getTotalPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalPointsPerStudent = yield enrollment_1.default.aggregate([
            {
                $group: {
                    _id: "$user_id", // Group by user_id
                    totalPoints: { $sum: "$points" }, // Sum up all points for each group
                },
            },
            {
                $lookup: {
                    from: "students", // Assuming your Student collection is named 'students'
                    localField: "_id",
                    foreignField: "_id",
                    as: "studentDetails",
                },
            },
            {
                $unwind: "$studentDetails", // Unwind to flatten the studentDetails array
            },
            {
                $project: {
                    _id: 0, // Exclude this from the final projection
                    studentUsername: "$studentDetails.username",
                    totalPoints: 1,
                    // studentId: "$_id",
                    // studentName: "$studentDetails.name",
                    // studentEmail: "$studentDetails.email",
                },
            },
            {
                $sort: { totalPoints: -1 }, // Add this line to sort by totalPoints in descending order
            },
        ]);
        res.status(200).json(totalPointsPerStudent);
    }
    catch (error) {
        console.error("Error getting total points per student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTotalPoints = getTotalPoints;
