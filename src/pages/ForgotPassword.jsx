import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
=====================================================
Forgot Password Page

Responsibilities
- Verify that the email exists
- Validate the new password
- Confirm the new password
- Update the password using AuthContext
- Redirect back to Login after a successful reset
=====================================================
*/

function ForgotPassword() {
  // Access the resetPassword function from AuthContext
  const { resetPassword } = useAuth();

  // Used to redirect back to the Login page
  const navigate = useNavigate();

  /*
    =====================================================
    Form State

    These are controlled form inputs.
    React keeps their values in sync with the UI.
    =====================================================
  */

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error message displayed on the page
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  /*
    =====================================================
    Handle Password Reset
    =====================================================
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all fields are completed
    if (!email || !newPassword || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    // Ensure passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Attempt to reset the password
    const result = resetPassword(email, newPassword);

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Notify the user
    alert("Password updated successfully. Please log in.");

    // Redirect back to Login
    navigate("/login");
  };

  return (
    <div className="page auth-container">
      <h2>Forgot Password</h2>

      <p>Enter your registered email address and choose a new password.</p>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Registered Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-container">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? "🙈 Hide" : "👁 Show"}
          </button>
        </div>

        <div className="password-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "🙈 Hide" : "👁 Show"}
          </button>
        </div>

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
