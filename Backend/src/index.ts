import express from 'express';
const app = express();
const port = process.env.PORT || 5001;
const connectDB = require('./DB/Connect');
require('dotenv').config();
const cors = require('cors');

// Importing Routes 
const studentRouter = require('./routes/studentRoute');
const enrollmentRouter = require('./routes/enrollmentRoute'); 


app.use(cors());

app.use(express.json());

// For Manager Routes
app.use('/api/student', studentRouter);

// Use the enrollment route
app.use('/api/enrollment', enrollmentRouter);



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