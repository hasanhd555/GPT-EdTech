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
exports.getRatingsByCourseId = void 0;
const http_status_codes_1 = require("http-status-codes");
const rating_1 = __importDefault(require("../models/rating"));
// Get ratings for a specific course by ID
const getRatingsByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const ratings = yield rating_1.default.find({ course_id: id });
        res.status(http_status_codes_1.StatusCodes.OK).json(ratings);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
    }
});
exports.getRatingsByCourseId = getRatingsByCourseId;
module.exports = {
    getRatingsByCourseId: exports.getRatingsByCourseId
};
