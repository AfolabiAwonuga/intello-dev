"use client";

import React, { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";

const ToggleNav = () => {
  const { theme, resolvedTheme } = useTheme();
  const [navBorders, setNavBorders] = useState("border-black");
  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setNavBorders(systemTheme === "dark" ? "border-white" : "border-black");
    } else {
      setNavBorders(theme === "dark" ? "border-white" : "border-black");
    }
  }, [theme]);

  return (
    <nav className=" ml-[8px] rounded-[10px] h-[50px] flex items-center">
      <p className="ml-1 text-sm md:text-md">
        <strong>IntelloDev</strong>
      </p>
      <div className="ml-auto mr-1">
        <ThemeToggle borderColor={navBorders} />
      </div>
    </nav>
  );
};

export default ToggleNav;
