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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
const connectDB = require('./DB/Connect');
require('dotenv').config();
const cors = require('cors');
// Importing Routes 
const studentRouter = require('./routes/studentRoute');
app.use(cors());
app.use(express_1.default.json());
// For Student Routes
app.use('/api/student', studentRouter);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
