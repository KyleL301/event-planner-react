<!-- Updated after assessor feedback: enforced user-specific events and authentication fixes -->

This project is a personal event planner web application built using React and Vite.  
It allows users to register, log in, and manage their own personal or professional events.  
Each user can only view and manage events they have created, ensuring proper user-specific data handling.

## Features

- User registration with name, username, email, and password
- Login restricted to registered users only
- Logout functionality to securely end a session
- User-specific dashboards displaying only the logged-in user’s events
- Create, view, and delete events with details such as:
  - Event name
  - Date and time
  - Location
  - Description
- Events are scoped per user and stored persistently using localStorage
- Global state management using the React Context API
- Protected routes to prevent unauthorised access
- Responsive design suitable for desktop and mobile screens

## Authentication Notes

This project uses client-side authentication for demonstration purposes.  
User accounts and events are stored in the browser’s localStorage and are scoped to individual users to prevent access to other users’ data.

## Installation and Running the App

To run this project locally, follow these steps:

1. Open a terminal in the project directory.
2. Install the required dependencies by running:
   npm install
3. Start the development server by running:
   npm run dev
4. Open your browser and go to:
   http://localhost:5173

The application runs in development mode using Vite.
