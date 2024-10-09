import React from "react";
import { createRoot } from "react-dom/client"; // Use createRoot instead of ReactDOM
import App from "./App";
import "./styles.css";

// Create the root element using createRoot
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render your app inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
