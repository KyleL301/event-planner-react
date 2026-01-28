import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
  ProtectedRoute component

  Purpose:
  - Prevent access to protected pages if the user is not logged in
  - Uses BOTH context state and localStorage as a fallback

  Why this is needed:
  - React may re-render before context updates complete
  - localStorage provides a reliable persisted auth check
*/
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  // Fallback: check localStorage in case context hasn't updated yet
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  // If no user exists in BOTH places, block access
  if (!currentUser && !storedUser) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated → allow access
  return children;
}

export default ProtectedRoute;
