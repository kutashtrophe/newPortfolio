import React, { useState, useEffect, useRef } from "react";
import Contact from "./Contact";
import { HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import NavLink from "./NavLink";
import "./Navbar.css";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: Any) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener on a component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={navbarRef} className="relative navbar">
      <button
        onClick={toggleNavbar}
        className="absolute top-0 right-0 m-4 z-10 transition-opacity duration-700 ease-in-out"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <XMarkIcon className="h-10 w-10 mx-10 my-5 text-white opacity-100" />
            </motion.div>
          ) : (
            <motion.div
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HomeIcon className="h-10 w-10 mx-10 my-5 text-white opacity-100" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <div className="absolute left-1/2 top-1/2 transform hover:bg-black transition ease-in-out duration-700 hover:text-white rounded-full -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white flex items-center justify-center z-10">
        <h1 className="text-blue-500 mt-10  cursor-default text-2xl">SK</h1>
      </div>
      <nav
        className={`transition-transform duration-700 ease-in-out transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } w-full h-24 rounded-md absolute bg-blue-500 text-white py-5`}
      >
        <div className="text-2xl text-center mb-4 flex justify-center">
          <span className="px-5">Sean</span>
          <span className="px-12"></span>
          <span>Kutash</span>
        </div>
        <div className="flex justify-center">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About Me</NavLink>
          <Contact />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
