import express from 'express';
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./DB/Connect');
require('dotenv').config();
const cors = require('cors');

// Use the cors middleware to allow cross-origin requests
app.use(cors());

app.use(express.json());

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();