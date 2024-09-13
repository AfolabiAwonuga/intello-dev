"use client";

import { ReactNode, useEffect, useState } from "react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { SideBarItems } from "@/types";
import { ITEMS } from "@/constants";
import Link from "next/link";
import SideBarButton from "@/components/SideBarButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";

export default function DashboardLayout({ children }: { children: ReactNode }) {
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

  // const { theme } = useTheme();

  // const fillColor = theme === "dark" ? "" : "";

  return (
    <div className="grid grid-cols-[auto_1fr] min-h-screen">
      <aside
        className={`relative border rounded-[10px] ${navColor} transition-all duration-300 ${
          collapsed ? "col-span-1 w-[60px]" : "col-span-1"
        }`}
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
          {/* <Separator className="bg-[#414749]/15 mb-[15px]" /> */}
          {/* <div className="flex flex-col mx-2 mb-[10px]">
            <div className="flex justify-between mx-1 pl-1">
              <Avatar className="border-2 size-7">
                <AvatarImage src="https://github.com/afolabiawonuga.png" />
              </Avatar>
            </div>
          </div> */}
        </div>
      </aside>
      <div className="grid grid-rows-[50px_1fr]">{children}</div>
    </div>
  );
}
