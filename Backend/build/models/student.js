"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const studentSchema = new mongoose_1.Schema({
    username: { type: String, required: [true, 'Username is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    name: { type: String, required: [true, 'Name is required'] },
    age: { type: Number, required: [true, 'Age is required'] },
    gender: { type: String, required: [true, 'Gender is required'] },
    profile_picture: { type: String, required: [true, 'Profile picture is required'] }
});
// Setters
studentSchema.methods.setUsername = function (username) { this.username = username; };
studentSchema.methods.setEmail = function (email) { this.email = email; };
studentSchema.methods.setPassword = function (password) { this.password = password; };
studentSchema.methods.setName = function (name) { this.name = name; };
studentSchema.methods.setAge = function (age) { this.age = age; };
studentSchema.methods.setGender = function (gender) { this.gender = gender; };
studentSchema.methods.setProfilePicture = function (profile_picture) { this.profile_picture = profile_picture; };
// Getters
studentSchema.methods.getUsername = function () { return this.username; };
studentSchema.methods.getEmail = function () { return this.email; };
studentSchema.methods.getPassword = function () { return this.password; };
studentSchema.methods.getName = function () { return this.name; };
studentSchema.methods.getAge = function () { return this.age; };
studentSchema.methods.getGender = function () { return this.gender; };
studentSchema.methods.getProfilePicture = function () { return this.profile_picture; };
exports.default = mongoose_1.default.model('Student', studentSchema);
