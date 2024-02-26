"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Controllers 
const { signup, login, getOneStudent, getAllStudents, updateStudent } = require('../controllers/studentController');
// SignUp Route 
router.route('/signup').post(signup);
// Log In Route 
router.route('/login').post(login);
// Get a Specific Student 
router.route('/').get(getOneStudent);
// Get All Students
router.route('/all').get(getAllStudents);
router.put('/update', updateStudent);
module.exports = router;
