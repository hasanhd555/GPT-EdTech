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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdmin = exports.login = exports.signup = exports.getAllAdmins = exports.getOneAdmin = void 0;
const http_status_codes_1 = require("http-status-codes");
const admin_1 = __importDefault(require("../models/admin"));
// Get one specific admin
const getOneAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In get 1 Admin function");
        const adminId = req.query.id;
        const admin = yield admin_1.default.findById(adminId);
        if (!admin) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ error: "admin not found" });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(admin);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.getOneAdmin = getOneAdmin;
// Get all admins
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In admin getall");
        const admins = yield admin_1.default.find();
        res.status(http_status_codes_1.StatusCodes.OK).json(admins);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.getAllAdmins = getAllAdmins;
// admin signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In admin signup");
        const { email, password } = req.body;
        const existingadmin = yield admin_1.default.findOne({ email });
        if (existingadmin) {
            return res
                .status(http_status_codes_1.StatusCodes.CONFLICT)
                .json({ error: "Email already in use" });
        }
        const objadmin = {
            email,
            password,
        };
        const admin = new admin_1.default(objadmin);
        yield admin.save();
        res.status(http_status_codes_1.StatusCodes.CREATED).json(admin);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.signup = signup;
// admin login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In admin login");
        const { email, password } = req.body;
        const admin = yield admin_1.default.findOne({ email });
        const isValidPassword = yield (admin === null || admin === void 0 ? void 0 : admin.isPasswordValid(password));
        if (!isValidPassword) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ error: "Invalid credentials" });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(admin);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.login = login;
// Update a specific admin
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id } = _a, updateData = __rest(_a, ["id"]); // Destructure the ID from the body
    try {
        const admin = yield admin_1.default.findById(id);
        if (!admin) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ error: "admin not found" });
        }
        // Update the admin object with new data
        Object.assign(admin, updateData);
        // Save the updated admin, triggering pre-save hooks
        const updatedAdmin = yield admin.save();
        res.status(http_status_codes_1.StatusCodes.OK).json(updatedAdmin);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server error" });
    }
});
exports.updateAdmin = updateAdmin;
