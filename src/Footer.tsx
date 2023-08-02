import React from "react";
import linkedInIcon from "/linkedin.svg";
import githubIcon from "/github.svg";
import resumeIcon from "/resume.png";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 rounded-t-md w-full h-16 bg-blue-500 text-white  flex items-center justify-center py-1">
      <a
        href="https://www.linkedin.com/in/seankutash/"
        className="mx-8 md:mx-6"
      >
        <img
          src={linkedInIcon}
          className="h-6 w-6 text-white hover:text-blue-300"
          alt="LinkedIn"
        />
      </a>
      <a href="https://github.com/kutashtrophe" className="mx-8 md:mx-6">
        <img
          src={githubIcon}
          className="h-6 w-6 text-white hover:text-blue-300"
          alt="Github"
        />
      </a>
      <a href="./SeanKutash_Resume.pdf" className="mx-8 md:mx-6">
        <img
          src={resumeIcon}
          className="h-6 w-6 text-white hover:text-blue-300"
          alt="Resume"
        />
      </a>
    </div>
  );
};

export default Footer;
