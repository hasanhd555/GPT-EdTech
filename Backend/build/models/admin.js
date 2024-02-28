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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminSchema = new mongoose_1.default.Schema({
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: [true, "Password is required"] },
});
// Set the email of the admin
adminSchema.methods.setEmail = function (email) {
    this.email = email;
};
// Get the email of the admin
adminSchema.methods.getEmail = function () {
    return this.email;
};
// Set the password of the admin
adminSchema.methods.setPassword = function (password) {
    this.password = password;
};
// Get the password of the admin
adminSchema.methods.getPassword = function () {
    return this.password;
};
// Pre Password Hash Function
adminSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        const hash = yield bcrypt_1.default.hash(this.password, 5);
        this.password = hash;
        next();
    });
});
// Hashed Password Validitiy Check Function
adminSchema.methods.isPasswordValid = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const compare = yield bcrypt_1.default.compare(password, this.password);
        return compare;
    });
};
const Admin = mongoose_1.default.model("Admin", adminSchema);
exports.default = Admin;
