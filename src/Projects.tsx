import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.99, // add scale property to make the page smaller
    x: "-100vw", // add x property to make the page move from left to right
  },
  in: {
    opacity: 1,
    scale: 1, // back to normal scale
    x: 0, // back to normal position
  },
  out: {
    opacity: 0,
    scale: 1.01, // make the page a bit larger
    x: "100vw", // move the page from right to left
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const Projects: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Projects
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-4 bg-white shadow sm:rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Project 1</h2>
              <p className="text-gray-600">Description of Project 1.</p>
            </div>
            <div className="px-4 py-4 mt-4 bg-white shadow sm:rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Project 2</h2>
              <p className="text-gray-600">Description of Project 2.</p>
            </div>
            {/* Add more projects as needed */}
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default Projects;
