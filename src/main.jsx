import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import "./styles/main.css";

/*
  Application entry point


*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider>
        <RouterProvider router={router} />
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>,
);
