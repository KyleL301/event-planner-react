// QA verification: router uses Layout to ensure EventContext is always available

import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Help from "./pages/Help";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

/*
=====================================================
Application Router

Responsibilities
- Define all application routes
- Separate public and protected pages
- Ensure all pages are wrapped inside Layout,
  giving them access to the Auth and Event Contexts.
=====================================================
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Redirect the root URL to Login
      { index: true, element: <Navigate to="/login" replace /> },

      /*
      =====================================================
      Public Routes

      These pages can be accessed without logging in.
      =====================================================
      */
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "help", element: <Help /> },

      /*
      =====================================================
      Protected Routes

      These pages require authentication.
      =====================================================
      */
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

      // Catch all unknown URLs
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
]);

export default router;
