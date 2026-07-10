import { createContext, useContext, useState } from "react";

/*
=====================================================
Auth Context

Responsibilities
- Register users
- Log users in
- Log users out
- Reset forgotten passwords
- Persist authentication data in localStorage
=====================================================
*/

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Load all registered users from localStorage
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );

  // Load the currently logged-in user
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null,
  );

  /*
  =====================================================
  Register

  - Prevent duplicate email registrations
  - Validate password strength
  - Save the new user
  =====================================================
  */
  const register = (userData) => {
    const existingUser = users.find(
      (user) => user.email?.toLowerCase() === userData.email?.toLowerCase(),
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    // Password requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(userData.password)) {
      return {
        success: false,
        message:
          "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number.",
      };
    }

    const updatedUsers = [...users, userData];

    setUsers(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return {
      success: true,
    };
  };

  /*
=====================================================
Login

Authenticates an existing user.

Returns:
- success: true when authentication succeeds
- success: false with an error message when it fails
=====================================================
*/
  const login = (email, password) => {
    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password,
    );

    if (!existingUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    setCurrentUser(existingUser);

    localStorage.setItem("currentUser", JSON.stringify(existingUser));

    return {
      success: true,
    };
  };

  /*
  =====================================================
  Reset Password

  Simulates a password recovery flow.

  Steps:
  1. Verify the email exists.
  2. Replace only that user's password.
  3. Save the updated users array.
  4. Return success or failure.
  =====================================================
  */
  const resetPassword = (email, newPassword) => {
    // Check whether the email exists
    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (!existingUser) {
      return {
        success: false,
        message: "No account found with that email.",
      };
    }

    // Validate the new password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return {
        success: false,
        message:
          "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number.",
      };
    }

    /*
      Create a NEW users array.

      We use map() so that only the matching
      user receives a new password.

      Every other user remains unchanged.
    */
    const updatedUsers = users.map((user) =>
      user.email.toLowerCase() === email.toLowerCase()
        ? {
            ...user,
            password: newPassword,
          }
        : user,
    );

    // Update React state
    setUsers(updatedUsers);

    // Persist to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return {
      success: true,
      message: "Password updated successfully.",
    };
  };

  /*
  =====================================================
  Logout
  =====================================================
  */
  const logout = () => {
    setCurrentUser(null);

    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}
