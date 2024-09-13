"use client";

import { Ellipsis, Plus } from "lucide-react";
import React from "react";

const NavBarThree = (props: { questionCount: number }) => {
  const { questionCount } = props;
  return (
    <div className="justify-between flex flex-row mx-[30px] mt-2">
      {/* dynamic val */}
      <span className="text-sm">{questionCount}</span>
      <div className="flex flex-row space-x-3">
        <Plus strokeWidth={1} size={18} />
        <Ellipsis strokeWidth={1} size={18} />
      </div>
    </div>
  );
};

export default NavBarThree;
