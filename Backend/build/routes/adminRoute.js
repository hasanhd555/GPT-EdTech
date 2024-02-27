"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Controllers
const { signup, login, getOneAdmin, getAllAdmins, updateAdmin, } = require("../controllers/adminController");
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
