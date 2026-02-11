import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Help from "./pages/Help";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; // use Layout instead of Header

/*
  Router configuration:
  Layout wraps ALL pages so they always stay inside
  the provider tree (Auth + Event context).
*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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

      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
]);

export default router;
