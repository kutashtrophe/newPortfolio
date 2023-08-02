import React from "react";
import { CSSPlugin } from "gsap/CSSPlugin";
import { gsap } from "gsap";
import "./Skills.css";
import HTML5Icon from "/Skills/html.png";
import CSS3Icon from "/Skills/css3.png";
import JavaScriptIcon from "/Skills/javascript.png";
import ReactIcon from "/Skills/react.png";
import NodeIcon from "/Skills/node.png";
import ThreeIcon from "/Skills/three.png";
import ExpressIcon from "/Skills/express.png";
import PostgreSQLIcon from "/Skills/postgres.png";
import ReduxIcon from "/Skills/redux.png";
import "./ReactStar.tsx";

gsap.registerPlugin(CSSPlugin);

const skills = [
  { name: "HTML5", icon: HTML5Icon },
  { name: "CSS3", icon: CSS3Icon },
  { name: "JavaScript", icon: JavaScriptIcon },
  { name: "React", icon: ReactIcon },
  { name: "Node.js", icon: NodeIcon },
  { name: "Three", icon: ThreeIcon },
  { name: "Express", icon: ExpressIcon },
  { name: "PostgreSQL", icon: PostgreSQLIcon },
  { name: "Redux", icon: ReduxIcon },
];

function Skills() {
  return (
    <div className="grid grid-cols-3 gap-4 items-center justify-center text-white">
      {skills.map((skill) => (
        <div key={skill.name} className="text-center text-white">
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-16 h-16 mx-auto mb-2 text-white"
          />
          <p className="text-base font-semibold text-white">{skill.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Skills;
