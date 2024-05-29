import { Circle } from "lucide-react";
import React from "react";

const NavBar = () => {
  return (
    <nav className="flex justify-center space-x-4 pt-[10px]">
      <button className="flex flex-row items-center">
        <Circle strokeWidth={0.5} color="#5C8F86" fill="#5C8F86" size={12} />
        <span className="text-[#000000] text-xs">Normal Mode</span>
      </button>
      <button className="flex flex-row items-center">
        <Circle strokeWidth={0.5} color="#595DD7" fill="#595DD7" size={12} />
        <span className="text-[#000000] text-xs">Sim Mode</span>
      </button>
      <button className="flex flex-row items-center">
        <Circle strokeWidth={0.5} color="#F0B95E" fill="#F0B95E" size={12} />
        <span className="text-[#000000] text-xs">Better Mode</span>
      </button>
    </nav>
  );
};

export default NavBar;
