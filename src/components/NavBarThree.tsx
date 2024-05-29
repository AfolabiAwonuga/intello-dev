"use client";

import { Ellipsis, Plus } from "lucide-react";
import React from "react";

const NavBarThree = () => {
  return (
    <div className="justify-between flex flex-row mx-5 mt-2">
      <span>1</span>
      <div className="flex flex-row space-x-3">
        <Plus strokeWidth={1.5} size={18} />
        <Ellipsis strokeWidth={1} size={18} />
      </div>
    </div>
  );
};

export default NavBarThree;
