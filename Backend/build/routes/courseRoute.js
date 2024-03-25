"use strict";
// courseRoute.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getAllCourses, getCourseById, serchCourseByName, createCourse, getEditableCourses, } = require("../controllers/courseController");
// Get All Courses
router.post("/", getAllCourses);
// Get A Specific Course by ID
router.post("/get-info", getCourseById);
// Create a new course 
router.post("/create", createCourse);
// Search Similar Course by Name
router.post("/search", serchCourseByName);
// Search Similar Course by Name
router.get("/editable", getEditableCourses);
module.exports = router;
