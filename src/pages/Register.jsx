import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
  Register Page

  Responsibilities:
  - Collect new user information
  - Validate required fields
  - Format the user's name consistently
  - Register the user through AuthContext
  - Display validation errors inside the page
*/
function Register() {
  // Access the register function from the authentication context
  const { register } = useAuth();

  // Used to redirect users after successful registration
  const navigate = useNavigate();

  /*
    Stores all form input values.

    React state is used because the values change as the
    user types into the form.
  */
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  /*
    Stores validation errors.

    Instead of using browser alerts, React displays this
    message inside the page.
  */
  const [error, setError] = useState("");

  // Controls whether the password is visible
  const [showPassword, setShowPassword] = useState(false);
  /*
    Updates whichever input the user is typing into.

    The input's "name" attribute determines which property
    inside formData gets updated.
  */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /*
    Converts names into Proper Case.

    Examples:

    kyle liberty
    ↓
    Kyle Liberty

    KYLE LIBERTY
    ↓
    Kyle Liberty
  */
  const formatName = (name) => {
    return name
      .trim()
      .split(" ")
      .filter((word) => word !== "")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  /*
    Handles registration when the form is submitted.
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure every required field has a value
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required.");
      return;
    }

    // Remove any previous error message
    setError("");

    /*
      Create a copy of the form data.

      The user's name is formatted before it is saved.
      This keeps the data consistent throughout the app.
    */
    const formattedData = {
      ...formData,
      name: formatName(formData.name),
    };

    // Attempt to register the new user
    const result = register(formattedData);

    // Registration failed
    if (!result.success) {
      setError(result.message);
      return;
    }

    // Registration successful
    navigate("/login");
  };

  return (
    <div className="page auth-container">
      <h2>Register</h2>

      {/* Display validation errors when they exist */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          id="register-name"
          name="name"
          placeholder="Full Name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          id="register-username"
          name="username"
          placeholder="Username"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          id="register-email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="password-container">
          <input
            id="register-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈 Hide" : "👁 Show"}
          </button>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
