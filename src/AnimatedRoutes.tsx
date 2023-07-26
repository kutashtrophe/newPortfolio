import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Projects from "./Projects";
import AboutMe from "./AboutMe";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.key} location={location}>
        <Route path="/home" element={<App />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<AboutMe />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
