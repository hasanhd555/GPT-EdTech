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
const questionSchema = new mongoose_1.Schema({
    question_text: { type: String, required: [true, 'Question text is required'] },
    correct_answer: { type: Number, required: [true, 'Correct answer is required'] },
    options: { type: [String], required: [true, 'Options are required'] },
    course_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Course', required: [true, 'Course ID is required'] }
});
questionSchema.methods.setQuestionText = function (text) {
    this.question_text = text;
};
questionSchema.methods.getQuestionText = function () {
    return this.question_text;
};
questionSchema.methods.setCorrectAnswer = function (answer) {
    this.correct_answer = answer;
};
questionSchema.methods.getCorrectAnswer = function () {
    return this.correct_answer;
};
questionSchema.methods.addOption = function (option) {
    this.options.push(option);
};
questionSchema.methods.removeOption = function (option) {
    const index = this.options.indexOf(option);
    if (index > -1) {
        this.options.splice(index, 1);
    }
};
exports.default = mongoose_1.default.model('Question', questionSchema);
