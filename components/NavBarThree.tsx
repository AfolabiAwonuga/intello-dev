"use client";

import { cn } from "@/lib/utils";
import { Ellipsis, Loader, Plus } from "lucide-react";
import React from "react";

const NavBarThree = (props: {
  questionCount: number;
  isLoading: boolean;
  className?: string;
}) => {
  const { questionCount, isLoading, className } = props;

  return (
    <div
      className={cn(
        "flex justify-between mx-[30px] mt-2 items-center",
        className
      )}
    >
      <span className="text-sm">{questionCount}</span>
      {isLoading && (
        <div className="flex items-center justify-center h-full w-full ">
          <Loader className="mr-2 size-4 animate-spin" />{" "}
          <p className="text-sm">Please Wait</p>
        </div>
      )}
      <div className="flex space-x-3">
        <Plus strokeWidth={1} size={18} />
        <Ellipsis strokeWidth={1} size={18} />
      </div>
    </div>
  );
};

export default NavBarThree;
