import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Help from "./pages/Help";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
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
  {
    path: "/help",
    element: <Help />,
  },
]);

export default router;
