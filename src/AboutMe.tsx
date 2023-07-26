import React from "react";
import { motion } from "framer-motion";
import "./AboutMe.css";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.99, // add scale property to make the page smaller
    y: "-100vh", // add x property to make the page move from left to right
  },
  in: {
    opacity: 1,
    scale: 1, // back to normal scale
    y: 0, // back to normal position
  },
  out: {
    opacity: 0,
    scale: 1.01, // make the page a bit larger
    y: "100vh", // move the page from right to left
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const AboutMe: React.FC = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      key="home"
      className="overflow-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="min-h-screen bg-black flex flex-col justify-center">
        <div className="container mx-auto px-4">
          <motion.section
            className="mt-0"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-bold top-10 mb-2">About Me</h2>
            <p className="text-base">
              This is where you write about yourself...
            </p>
          </motion.section>

          <motion.section
            className="mt-6"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-xl font-bold mb-2">Skills</h2>
            <p className="text-base">List your skills here...</p>
          </motion.section>

          <motion.section
            className="mt-6"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-xl font-bold mb-2">Experience</h2>
            <p className="text-base">Detail your work experience here...</p>
          </motion.section>

          <motion.section
            className="mt-6"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ delay: 1.1 }}
          >
            <h2 className="text-xl font-bold mb-2">Education</h2>
            <p className="text-base">
              Detail your educational background here...
            </p>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutMe;
