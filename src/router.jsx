import { createBrowserRouter } from "react-router-dom";

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
  - Public routes: Login, Register, Help
  - Protected routes: Dashboard, Add Event, Edit Event
  - Header is shown on all pages
*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      // Public routes
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/help", element: <Help /> },

      // Protected routes
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-event",
        element: (
          <ProtectedRoute>
            <AddEvent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-event/:id",
        element: (
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        ),
      },

      // Default route
      { path: "*", element: <Login /> },
    ],
  },
]);

export default router;
