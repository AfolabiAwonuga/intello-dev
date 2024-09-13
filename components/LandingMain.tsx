"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const LandingNav = () => {
  const { theme, resolvedTheme } = useTheme();
  const [textColor, setTextColor] = useState("text-black");

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTextColor(systemTheme === "dark" ? "text-white" : "text-black");
    } else {
      setTextColor(theme === "dark" ? "text-white" : "text-black");
    }
  }, [theme]);

  return (
    <AnimatedText
      text="IntelloDev"
      className={`text-6xl font-bold mb-8 ${textColor}`}
    ></AnimatedText>
  );
};

export default LandingNav;
