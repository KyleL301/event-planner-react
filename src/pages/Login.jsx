import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
  Login page:
  - Allows registered users to log in
  - Uses autocomplete attributes for better UX and accessibility
*/
function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Local state for login inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*
    Handle login submission:
    - Calls login(email, password)
    - Redirects to dashboard on success
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="page auth-container">
      <h2>Login</h2>

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

        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
