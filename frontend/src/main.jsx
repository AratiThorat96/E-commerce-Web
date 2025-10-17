import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import "./index.css";
import UserContext from "./context/UserContext.jsx";
import ShopContext from "./context/ShopContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserContext>
        <ShopContext>
          <App/>
        </ShopContext>
        </UserContext>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);