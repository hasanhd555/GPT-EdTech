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
exports.updateLessonById = exports.getLessonsByCourseId = void 0;
const http_status_codes_1 = require("http-status-codes");
const lesson_1 = __importDefault(require("../models/lesson"));
// Get lessons for a specific course by ID
const getLessonsByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const lessons = yield lesson_1.default.find({ course_id: id });
        res.status(http_status_codes_1.StatusCodes.OK).json(lessons);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
});
exports.getLessonsByCourseId = getLessonsByCourseId;
const updateLessonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("updateLessonById");
        const { lessonId } = req.params;
        const { title, content } = req.body;
        // Check if lessonId is provided
        if (!lessonId) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: "Lesson ID must be provided" });
        }
        console.log("updateLessonById for lessonId:", lessonId);
        // Use findByIdAndUpdate for a more concise operation
        const updatedLesson = yield lesson_1.default.findByIdAndUpdate(lessonId, { title, content }, { new: true } // Returns the modified document rather than the original
        );
        if (!updatedLesson) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "Lesson not found" });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(updatedLesson);
    }
    catch (error) {
        console.error(error); // It's helpful to log the error for debugging purposes
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
});
exports.updateLessonById = updateLessonById;
module.exports = {
    getLessonsByCourseId: exports.getLessonsByCourseId,
    updateLessonById: exports.updateLessonById,
};
