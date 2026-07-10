import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
=====================================================
Login Page

Responsibilities
- Authenticate registered users
- Display validation errors inline
- Redirect successful logins to the dashboard
=====================================================
*/

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error state
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  /*
  =====================================================
  Handle Login Submission
  =====================================================
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous error messages
    setError("");

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="page auth-container">
      <h2>Login</h2>

      {/* Display authentication errors */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-container">
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈 Hide" : "👁 Show"}
          </button>
        </div>

        <button type="submit">Login</button>
      </form>

      {/* Password recovery */}
      <p className="forgot-password">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
}

export default Login;
