"use strict";
// commentRoute.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getCommentsByCourseId } = require('../controllers/commentController');
// Get Comments for a specific course by ID
router.post('/get-by-id', getCommentsByCourseId);
module.exports = router;
