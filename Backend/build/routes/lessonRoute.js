"use strict";
// lessonRoute.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getLessonsByCourseId, updateLessonById } = require('../controllers/lessonController');
// Get Lessons for a specific course by ID
router.post('/get-by-id', getLessonsByCourseId);
// Update a lesson 
router.put('/update/:lessonId', updateLessonById);
module.exports = router;
