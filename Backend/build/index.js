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
const express_1 = __importDefault(require("express"));
const Constant_1 = require("./Constant");
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
const connectDB = require("./DB/Connect");
require("dotenv").config();
const cors = require("cors");
// Importing Routes
const studentRouter = require("./routes/studentRoute");
const enrollmentRouter = require("./routes/enrollmentRoute");
const adminRouter = require("./routes/adminRoute");
const courseRouter = require("./routes/courseRoute");
const lessonRouter = require("./routes/lessonRoute");
const ratingRouter = require("./routes/ratingRoute");
const commentRouter = require("./routes/commentRoute");
const questionRouter = require("./routes/questionRoute");
app.use(cors());
app.use(express_1.default.json());
// For Student Routes
app.use(Constant_1.StudentRoute, studentRouter);
// Use the enrollment route
app.use(Constant_1.EnrollmentRoute, enrollmentRouter);
app.use(Constant_1.AdminRoute, adminRouter);
app.use(Constant_1.CourseRoute, courseRouter);
app.use(Constant_1.CourseLessonRoute, lessonRouter);
app.use(Constant_1.CourseRatingRoute, ratingRouter);
app.use(Constant_1.CourseCommentRoute, commentRouter);
app.use(Constant_1.CourseQuizRoute, questionRouter);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
