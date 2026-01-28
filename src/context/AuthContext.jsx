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
    - Saves the user to the list of users
    - Logs them in immediately
  */
  const register = (userData) => {
    const updatedUsers = [...users, userData];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setCurrentUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
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
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth context
export function useAuth() {
  return useContext(AuthContext);
}
