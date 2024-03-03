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

