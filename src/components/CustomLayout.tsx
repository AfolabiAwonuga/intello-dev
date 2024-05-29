"use client";
import React from "react";
import Link from "next/link";
import SideBarButton from "./SideBarButton";
import { usePathname } from "next/navigation";
import { MAIN_ITEMS, LOCKER_ITEMS } from "@/constants";
import SideBarMain from "./SideBarMain";

const CustomLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-[200px_1fr] grid-auto-columns:auto">
      <SideBarMain mainitems={MAIN_ITEMS} lockeritems={LOCKER_ITEMS} />
      {children}
    </div>
  );
};

export default CustomLayout;
