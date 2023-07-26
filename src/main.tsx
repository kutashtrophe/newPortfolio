import React from "react";
import AnimatedRoutes from "./AnimatedRoutes.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import "./index.css";

const container = document.getElementById("root");

if (container !== null) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Router>
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </React.StrictMode>
  );
}
