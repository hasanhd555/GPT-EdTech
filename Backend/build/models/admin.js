"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    email: { type: String, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] }
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
exports.default = mongoose_1.default.model('Admin', adminSchema);
