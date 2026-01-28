import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
  Register page:
  - Creates a new user
  - Uses autocomplete attributes for better form handling
*/
function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Local state for registration form
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // Update form state when inputs change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /*
    Handle registration:
    - Validates required fields
    - Registers user
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      alert("All fields are required");
      return;
    }

    register(formData);
    navigate("/dashboard");
  };

  return (
    <div className="page auth-container">
      <h2>Register</h2>

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

        <input
          id="register-password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
