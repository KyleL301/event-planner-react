import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Help from "./pages/Help";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

/*
  Router configuration:
  - App ALWAYS starts at /login
  - Public routes: Login, Register, Help
  - Protected routes: Dashboard, Add Event, Edit Event
  - Header is shown on all pages
*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      // Force root to login for clear auth flow
      { index: true, element: <Navigate to="/login" replace /> },

      // Public routes
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "help", element: <Help /> },

      // Protected routes
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-event",
        element: (
          <ProtectedRoute>
            <AddEvent />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-event/:id",
        element: (
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        ),
      },

      // Fallback
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
]);

export default router;
