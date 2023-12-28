import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Authentication/AuthProvider/AuthProvider.jsx";
import "react-toastify/dist/ReactToastify.css";
import { FileProvider } from "./context/FileContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FileProvider>
          <App />
        </FileProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
