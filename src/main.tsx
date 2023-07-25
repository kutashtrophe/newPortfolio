import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import App from "./App.tsx";
import Navbar from "./Navbar.tsx";
import Projects from "./Projects.tsx";
import "./index.css";

const container = document.getElementById("root");

if (container !== null) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Router>
        <Navbar />
        <AnimatePresence>
          <Routes>
            <Route path="/projects" element={<Projects />} />
            <Route path="/" element={<App />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </React.StrictMode>
  );
}
