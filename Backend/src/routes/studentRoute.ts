import express from 'express';
const router = express.Router();
// Controllers 
const {signup,login,getOneStudent,getAllStudents } = require('../controllers/studentController');

// SignUp Route 
router.route('/signup').post(signup);
// Log In Route 
router.route('/login').post(login);
// Get a Specific Student 
router.route('/').get(getOneStudent);
// Get All Students
router.route('/all').get(getAllStudents);

module.exports = router;