"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getCoursesForUser, enrollStudent, getCourseEnrollement, getTotalPoints, setPoints, } = require("../controllers/enrollmentController");
// Route to get courses for a user
router.post("/courses", getCoursesForUser);
router.post("/enroll", enrollStudent);
router.post("/get-enrollment", getCourseEnrollement);
router.get("/get-total-points", getTotalPoints);
router.post("/set-points", setPoints);
module.exports = router;
