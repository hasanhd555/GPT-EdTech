# GPT-EdTech

## Setup instructions
To set up:
1. Run `npm i` in both the frontend and the backend folders.
2. Then run `npm start` in both folders to start the web application.

## Directory structure
### Frontend
- Frontend contains a ReactApp.
- It is set up as you would expect with the development in the src folder.
- In the src folder, the relevant files and folders are:
  - **Schemas**
    - Contains the relevant rules for login and signup.
  - **components**
    - This folder contains all React components that are rendered on the website.
  - **pages**
    - This folder contains the Login and Signup pages.
  - **redux**
    - **store.ts**
      - Contains the Redux store setup.
    - **hooks**
      - Contains the hooks to access and modify the Redux store.
    - **test_comp**
      - Contains React components that are not part of the page and are only used for testing.
  - **App.tsx**
    - Contains the logic for all of the routes of the web application.
  - **index.tsx**
    - Base file which integrates the Redux store with the rest of the web application.

### Backend

To set up the backend:

1. Navigate to the backend directory:
   ```bash
   cd backend

# Install the required dependencies:
npm install

# Start the server:
npm start

# Environment Variables
Create a .env file in the root of your backend directory and add the following keys:

PORT: The port number for the server to listen on.
MONGO_URI: Your MongoDB connection string.
Make sure to replace the placeholders with your actual data.

# Directory Structure
The backend is a Node.js server set up with express. The development is concentrated in the src folder.

controllers: Contains controller classes for handling API requests.
models: Houses Mongoose models for database schema definitions.
routes: Defines express routes that map endpoints to controller functions.
DB: Includes a utility to connect to the MongoDB database.
utils.ts: A set of utility functions for common operations.
constants.ts: Defines constants and types used across the backend.
index.ts: The main server file that starts the express application.

# Main Files
index.ts: Initializes express middleware, routes, and starts the server.
Connect.ts: Handles the connection logic to MongoDB.
constants.ts: Contains constants like data types and enums.
utils.ts: Provides utility functions used throughout the application.

# API Endpoints
The server offers several RESTful endpoints:

/api/student: For student-related operations.
/api/enrollment: To manage enrollments.
/api/admin: For admin account operations.
/api/course: To handle courses.
/api/course/lessons: Specific to lesson management within courses.
/api/course/ratings: For managing course ratings.
/api/course/comments: To handle comments on courses.

# Controllers
Each controller file in the controllers directory is responsible for handling requests related to a specific entity such as students, courses, admins, etc.

# Models
In the models directory, each file defines a schema for a resource in the database.

# Routes
The routes directory contains files that define the API endpoints and link them to the appropriate controller functions.

# Additional Information
Ensure MongoDB is running before you start the server.
The server uses CORS to allow requests from different origins, such as your frontend.

