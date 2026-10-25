import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import "@/assets/Styles/index.css"; // CSS global

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
