/* @refresh reset */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext } from "react";

// Create context
export const authDataContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
  // Set serverUrl to 8000 to match the backend index.js configuration
  const serverUrl = "https://e-commerce-web-backend-sgbf.onrender.com"; 
  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
};
