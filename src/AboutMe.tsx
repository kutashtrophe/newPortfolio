import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Stars from "./Stars";
import { motion } from "framer-motion";
import "./AboutMe.css";
import Skills from "./Skills";

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

const useScrollPosition = (elementRef: any) => {
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = () => {
    if (!elementRef.current) return;

    const totalHeight =
      elementRef.current.scrollHeight - elementRef.current.clientHeight;
    const scrollPosition = elementRef.current.scrollTop;

    const calculatedScrollPos = scrollPosition / totalHeight;

    setScrollPos(calculatedScrollPos);
  };

  useEffect(() => {
    const scrollableDiv = elementRef.current;

    if (!scrollableDiv) return;

    scrollableDiv.addEventListener("scroll", handleScroll);

    return () => scrollableDiv.removeEventListener("scroll", handleScroll);
  }, [elementRef]);

  return scrollPos;
};

export const AboutMe: React.FC = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const scrollRef = React.useRef(null);
  const scrollPosition = useScrollPosition(scrollRef);

  return (
    <motion.div
      key="home"
      className=""
      initial={"initial"}
      animate={"in"}
      exit={"out"}
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="min-h-screen bg-transparent flex flex-col relative overflow-y-hidden">
        <Canvas
          shadows
          className="absolute -z-10"
          style={{ width: "100vw", height: "100vh", background: "black" }}
        >
          <Stars scrollPosition={scrollPosition} />
        </Canvas>
        <div
          className="absolute z-10 top-0 bottom-0 left-0 right-0 overflow-y-scroll"
          ref={scrollRef}
        >
          <div className="md:pt-36 pt-36 container mx-auto md:px-48">
            <motion.section
              className="flex flex-col md:flex-row mt-0 z-20"
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ delay: 0.7 }}
            >
              <div className="flex-1 px-10">
                <h2 className="text-3xl text-white font-bold text-center md:mt-0 md:text-left mb-2">
                  About Me
                </h2>
                <p className="text-lg text-white md:max-w-lg pb-6">
                  Hello, I'm Sean, a versatile web developer adept in both
                  front-end and back-end technologies. I excel at designing
                  user-friendly applications using React, creating responsive
                  layouts, integrating libraries, and optimizing performance.
                  With a knack for Redux and modern CSS techniques, my aim is
                  always to deliver seamless user experiences. <br /> <br /> In
                  the back-end arena, my strength lies in the Node.js ecosystem,
                  where I use Express to develop scalable server applications.
                  I'm skilled at creating RESTful APIs, facilitating smooth data
                  transfer between client and server. My expertise in PostgreSQL
                  allows for efficient data organization and accessibility.{" "}
                  <br /> <br />
                  Throughout my career, I've embraced collaboration and
                  continuous learning, always open to teaming up with others to
                  drive projects to success. Beyond coding, I stay abreast of
                  industry trends and best practices, continuously exploring new
                  technologies to enhance my skills and provide innovative
                  solutions. If you're in search of a dedicated developer who
                  can merge front-end and back-end expertise using React,
                  Express, Node.js, Redux, and PostgreSQL, I'd be excited to
                  collaborate on your next project.
                  <br /> <br /> Let's connect and bring your vision to life.
                </p>
              </div>
              <div className="flex-1 md:max-w-md pt-6 md:pt-0">
                <img
                  src="/sean2.png" // replace this with the actual path to the image
                  alt="description of image" // replace this with a description of the image
                  className="w-full md:rounded-2xl landscape:rounded-xl" // adjust classes as needed to style the image
                />
              </div>
            </motion.section>

            <motion.section
              className="mt-6 z-10 px-10"
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ delay: 1 }}
            >
              <h2 className="text-3xl text-white text-center font-bold mb-2">
                Skills
              </h2>
              <Skills />
            </motion.section>

            <motion.section
              className="mt-6 px-10"
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ delay: 1.2 }}
            >
              <h2 className="text-3xl text-white font-bold mb-2">Experience</h2>
              <p className="text-lg text-white">
                <b className="text-2xl text-white">
                  Submarine Sonar Technician | U.S. Navy, Norfolk, VA | December
                  2013 - May 2018
                </b>
                <br /> Engaged with a team on high-stakes missions in the Middle
                East and Arctic, earning Navy "E" ribbon and Global War on
                Terrorism Expeditionary Medal. Awarded Navy Arctic Service
                ribbon and Navy and Marine Corps Achievement Medal for
                exceptional performance.
              </p>
            </motion.section>

            <motion.section
              className="mt-6 mb-36 px-10"
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ delay: 1.4 }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">Education</h2>
              <p className="text-lg text-white">
                <b className="text-2xl text-white">
                  Fullstack Academy Web Development Bootcamp | March 2023 -
                  August 2023
                </b>
                <br /> Software Engineering Certificate Full-time, Full Stack
                Javascript Web Development Immersive <br /> <br />
                <b className="text-2xl text-white">
                  Florida SouthWestern State College | Fort Myers, FL | December
                  2019
                </b>{" "}
                <br />
                Associate of Arts: Network Services Technology <br />
                Courses: Intro to Programming, Intro to Databases, Calculus with
                Analytic Geometry II, Physics II, Statistical Methods
              </p>
            </motion.section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutMe;
