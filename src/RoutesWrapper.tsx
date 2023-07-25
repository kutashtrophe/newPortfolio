import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import App from "./App.tsx";
import Projects from "./Projects.tsx";

const RoutesWrapper: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname}>
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={<App />} />
      </Routes>
    </AnimatePresence>
  );
};

export default RoutesWrapper;
