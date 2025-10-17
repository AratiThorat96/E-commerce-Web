/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import { authDataContext } from "./authContext";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  // Fallback server URL if undefined
  const baseUrl = serverUrl || "http://localhost:8000";

  const getCurrentUser = async () => {
    try {
     console.log("Fetching current user from:", `${baseUrl}/api/user/getcurrentuser`);

const result = await axios.get(
  `${baseUrl}/api/user/getcurrentuser`,
  { withCredentials: true }
);


      setUserData(result.data);
      console.log("Current User:", result.data);
    } catch (error) {
      setUserData(null);

      // Detailed error logging
      if (error.response) {
        // This is where the initial 401 'User does not have a token' error is caught. This is expected.
        console.log("Axios response error:", error.response.data);
      } else if (error.request) {
        console.log("Axios request error (no response):", error.request);
      } else {
        console.log("Axios setup error:", error.message);
      }
    }
  };

  // This runs on mount and triggers the initial 401 if no cookie is present.
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;