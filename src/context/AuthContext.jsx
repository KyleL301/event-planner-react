import { createContext, useContext, useState } from "react";

/*
  AuthContext is responsible for:
  - Storing registered users
  - Managing login/logout
  - Making sure users must register before logging in
*/
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Load all registered users from localStorage (or empty array)
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );

  // Load the currently logged-in user (if any)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null,
  );

  /*
    Registers a new user:
    - Prevents duplicate email registrations
    - Saves the user to localStorage
    - DOES NOT log them in automatically
    - User must log in manually after registering
  */
  const register = (userData) => {
    // Check if a user with this email already exists
    const existingUser = users.find(
      (user) => user.email?.toLowerCase() === userData.email?.toLowerCase(),
    );

    // Stop registration if the email is already registered
    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    // Password must meet minimum security requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(userData.password)) {
      return {
        success: false,
        message:
          "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number.",
      };
    }

    // Add the new user
    const updatedUsers = [...users, userData];

    // Update state
    setUsers(updatedUsers);

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Tell the calling component that registration succeeded
    return {
      success: true,
    };
  };

  /*
    Logs a user in ONLY if they already exist.
    If the user does not exist, login is blocked.
  */
  const login = (email, password) => {
    const existingUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!existingUser) {
      alert("User not found. Please register first.");
      return false;
    }

    setCurrentUser(existingUser);
    localStorage.setItem("currentUser", JSON.stringify(existingUser));
    return true;
  };

  /*
    Logs out the current user
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth context
export function useAuth() {
  return useContext(AuthContext);
}
