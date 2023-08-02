import React from "react";
import { motion } from "framer-motion";
import ThreeProject from "./ThreeProject";
import mySoEVid from "/ShadowsofEternia.mp4";
import mySVVid from "/stardewmp4.mp4";

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
    opacity: 1,
    scale: 1.01, // make the page a bit larger
    y: "100vh", // move the page from up to down
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
      key="projects"
      className="min-h-screen bg-[#031525]"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="h-screen bg-[#000000] overflow-x-hidden">
        <ThreeProject />
        <header className="bg-gray-700 shadow-xl"></header>
        <main>
          <div className="max-w-[69vw] mx-auto pt-0 pb-24 md:pt-0 md:pb-0 md:py-36 sm:px-14 lg:px-8">
            <div className="flex flex-col-reverse md:flex-row px-4 py-4 bg-white shadow sm:rounded-lg">
              {/* Video on the left */}
              <div className="flex-1">
                <h2 className="text-xl text-black font-semibold mb-2">
                  Stardew Valley e-Commerce Web Application
                </h2>
                <p className="text-gray-600">
                  Stardew Valley Themed E-Commerce Web Application is a unique
                  fictional digital shopping experience aimed at fans of the
                  beloved video game. The platform, designed as a full-stack
                  application, weaves in the game's theme, offering customers an
                  engaging and interactive platform to shop for novel digital
                  items. It features a streamlined database with automated
                  updates whenever a client adds an item to the cart, providing
                  smooth, real-time shopping experience. The incorporation of
                  secure authentication systems underpins the platform's
                  commitment to user data safety. Aesthetically, it incorporates
                  animated CSS keyframe bezier animations, giving the platform a
                  dynamically animated, visually-appealing touch. <br />
                  <br />
                  The tech stack for this project comprised of JavaScript,
                  React, Sequelize, Express, Postgresql, Tailwind CSS, Redux,
                  Bcrypt, JSON Web Token.
                </p>
              </div>
              <div className="flex-1 mb-4 md:mb-0 md:ml-4 md:order-1">
                <video autoPlay loop muted className="rounded-lg w-full">
                  <source src={mySVVid} type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row mb-2 md:mb-36 px-4  py-4 mt-4 bg-white shadow sm:rounded-lg">
              {/* Video on the right */}
              <div className=" flex-1 mb-4 mt-4 md:mt-0 md:mr-4">
                <video autoPlay loop muted className="rounded-lg">
                  <source src={mySoEVid} type="video/mp4" />
                </video>
              </div>
              <div className="flex-1">
                <h2 className="text-xl text-black font-semibold mb-2">
                  Shadows of Eternia
                </h2>
                <p className="text-gray-600">
                  Shadows of Eternia is an engaging 2D dungeon crawler video
                  game, with its inspiration drawn from classic games such as
                  The Legend of Zelda. Designed with a scalable and reliable
                  Firebase realtime database, the game ensures efficient data
                  management, integrating seamlessly with front-end and back-end
                  code. A critical feature of the game is its user profile
                  architecture that offers user identity, authentication, and
                  personalization, enhancing the user gaming experience.
                  Additionally, a unique hosting feature and a "lobby" system
                  have been developed to improve multiplayer interactions and
                  pre-game setups. Over 300 type errors were diligently
                  troubleshot and resolved to ensure a stable, deployable game
                  application. The front-end user interface, polished with
                  Tailwind CSS, ensures an immersive and aesthetically pleasing
                  gaming experience.
                  <br />
                  <br /> The tech stack for this project included Vite,
                  Typescript, Firebase, Phaser, React, Redux, and Tailwind CSS.
                </p>
              </div>
            </div>
            {/* Add more projects here as needed */}
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default Projects;
