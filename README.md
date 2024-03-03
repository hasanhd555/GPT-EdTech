# GPT-EdTech

# Setup instructions
To set up :
run npm i in both the frontend and the backend folders
Then run npm start in both folders to start the webpage

# Directory structure
Frontend contains a ReactApp
It is set up as you would expect with the development in the src folder
In the src folder the relevant files and folders are:
  Schemas
    Contains the relevant rules for login and Signup
  components
    This folder contains all react components that are rendered on the website
  pages
    This folder contains the Login and Signup pages
  redux
    store.ts
      Contains the redux store setup
    hooks
      Contains the hooks to access and modify the redux store
    test_comp
      Contains React components that are not part of the page and are only used for testing
  App.tsx
    Contains the logic for all of the routes of the web application
  index.tsx
    Base File which integrates the redux store with the rest of the web application 
Backend
