"use client";

import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBarButton from "./SideBarButton";
import { ITEMS } from "@/constants";

const Aside = () => {
  const [collapsed, setCollapsed] = useState(true);
  const handleClick = () => {
    setCollapsed((prev) => !prev);
  };

  const [fillColor, setFillColor] = useState("#ffff");
  const [navColor, setNavColor] = useState("bg-black");

  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setFillColor(systemTheme === "dark" ? "" : "#ffff");
      setNavColor(systemTheme === "dark" ? "bg-black" : "bg-black");
    } else {
      setFillColor(theme === "dark" ? "" : "#ffff");
      setNavColor(theme === "dark" ? "bg-black" : "bg-black");
    }
  }, [theme]);
  return (
    <>
      <aside
        className={`relative border rounded-[10px] ${navColor} transition-all duration-300 ${
          collapsed ? "col-span-1 w-[60px]" : "col-span-1"
        } hidden md:block`}
        data-collapse={collapsed}
      >
        <button
          className="flex cursor-pointer justify-center items-center absolute right-0 top-[29px] translate-x-1/2"
          onClick={handleClick}
        >
          {!collapsed ? (
            <CircleChevronLeft fill={fillColor} strokeWidth={1} size={24} />
          ) : (
            <CircleChevronRight fill={fillColor} strokeWidth={1} size={24} />
          )}
        </button>
        <div className="flex flex-col justify-between h-full ">
          <div className="mt-[10px] flex flex-col gap-1 mx-2  ">
            {ITEMS.links.map((link, idx) => (
              <Link key={idx} href={link.href!}>
                <SideBarButton
                  variant="ghost"
                  icon={link.icon}
                  className={` ${
                    !collapsed
                      ? "gap-2 justify-normal w-32"
                      : "w-full hover:ml-1"
                  }`}
                >
                  {!collapsed && link.label}
                </SideBarButton>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
