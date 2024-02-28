import express from "express";
const router = express.Router();
// Controllers
const {
  signup,
  login,
  getOneAdmin,
  getAllAdmins,
  updateAdmin,
} = require("../controllers/adminController");

// SignUp Route
router.route("/signup").post(signup);
// Log In Route
router.route("/login").post(login);
// Get a Specific Admin
router.route("/").get(getOneAdmin);
// Get All Admins
router.route("/all").get(getAllAdmins);

router.put("/update", updateAdmin);

module.exports = router;
