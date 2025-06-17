
# Bug Tracking System

A React frontend application that interacts with a backend API for authentication, project management, and issue tracking.



## Overview

This project is a React-based web app that communicates with a backend API for user authentication and project management. It includes features like user login, project creation, updating, viewing project details, and issue tracking.

---

## Features

* User Authentication (Login/Signup)
* Protected routes for authenticated users
* CRUD operations on Projects and Issues
* Responsive UI with form validation
* Token-based API communication



### Prerequisites

* Node.js installed 
* npm or yarn package manager
* Backend API running locally at `http://localhost:5000`

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Navigate to the project folder

   ```bash
   cd your-repo
   ```

3. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server

   ```bash
   npm start
   # or
   yarn start
   ```

The app will run on `http://localhost:3000` by default.

---

## Folder Structure

```
src/
│
├── components/           # Reusable React components
├── config/               # Configuration files (e.g., Auth_url.js)
├── pages/                # React pages for routing
├── services/             # API service helpers
├── App.js                # Main app component
└── index.js              # Entry point
```

---
## Environment Variables
Create a .env file in your backend root directory and add the following variables:

env
Copy
Edit
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=bug_tracker
JWT_SECRET=bug

## API Configuration

API base URLs are centralized inside the `src/config/` folder. For example, the authentication base URL is defined in:

```js
// src/config/Auth_url.js
const Auth_url = "http://localhost:5000/api/auth";
export default Auth_url;
```

Use these constants to build full API endpoint URLs across your app to ensure maintainability.

---

## Usage


---

## Available Scripts

* `npm start` — Runs the app in development mode
* `npm run build` — Builds the app for production
* `npm test` — Launches the test runner
* `npm eject` — Removes create-react-app build dependency (use with caution)

---

## Technologies

* React
* React Router
* Axios
* Tailwind CSS (or your CSS framework)
* Node.js (Backend assumed)

---
## Postman Api 
https://.postman.co/workspace/My-Workspace~c4f2c29e-346f-4d2e-89aa-cecd6caef230/collection/undefined?action=share&creator=37306024&active-environment=37306024-78d315c3-e8d3-4292-9075-24c5a1ee89f0
