import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Stars from "./Stars";
import { motion } from "framer-motion";

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

export const NotFound: React.FC = () => {
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
      <div className="min-h-screen bg-transparent flex flex-col justify-center items-center relative overflow-y-hidden">
        <Canvas
          shadows
          className="absolute -z-10"
          style={{ width: "100vw", height: "100vh", background: "black" }}
        >
          <Stars scrollPosition={scrollPosition} />
        </Canvas>
      </div>
      <div className="absolute md:top-[33vh] top-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl z-20 text-white">
        You're Lost In Space!
      </div>
      <div className="absolute md:top-[69vh] top-[40rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl z-20 text-white">
        404
      </div>
    </motion.div>
  );
};

export default NotFound;
