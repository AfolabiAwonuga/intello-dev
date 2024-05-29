"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/constants";
import SideBarMain from "@/components/SideBarMain";
import NavBar from "@/components/NavBar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      {/* <NavBar /> */}
      <SideBarMain sidebaritems={SIDEBAR_ITEMS} />
      {children}
    </div>
  );
};

export default DashboardLayout;
