import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
  Header component (Layout component)

  IMPORTANT:
  - This component acts as a layout
  - <Outlet /> is REQUIRED to render child routes
*/
function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  /*
    Logs the user out and redirects to login
  */
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header className="header">
        <h1 className="logo">Event Planner</h1>

        <nav>
          {/* Help is always visible */}
          <NavLink to="/help">Help</NavLink>

          {/* Not logged in */}
          {!currentUser && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}

          {/* Logged in */}
          {currentUser && (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/add-event">Add Event</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </header>

      {}
      <Outlet />
    </>
  );
}

export default Header;
