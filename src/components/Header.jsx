import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <h1 className="logo">Event Planner</h1>

      <nav>
        {isAuthenticated && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/add-event">Add Event</NavLink>
            <NavLink to="/help">Help</NavLink>
            <button onClick={logout}>Logout</button>
          </>
        )}

        {!isAuthenticated && (
          <>
            <NavLink to="/">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
