"use client";
import React from "react";
import Link from "next/link";
import SideBarButton from "./SideBarButton";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/constants";
import SideBarMain from "./SideBarMain";

const CustomLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-[200px_1fr] grid-auto-columns:auto">
      <SideBarMain sidebaritems={SIDEBAR_ITEMS} />
      {children}
    </div>
  );
};

export default CustomLayout;
