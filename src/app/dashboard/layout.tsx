"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "@/constants";
import SideBarMain from "@/components/SideBarMain";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <SideBarMain sidebaritems={SIDEBAR_ITEMS} />
      {children}
    </div>
  );
};

export default DashboardLayout;
