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
      <div className="grid grid-cols-2">
        <div className="grid m-[5px] rounded-[10px]">
          <div className="grid grid-rows-[240px_1fr]  my-[70px] mx-[40px] rounded-sm gap-7 bg-[#efefef]/60">
            <div className="border border-black rounded-sm mx-[5px] mt-[40px] bg-[#ffffff]"></div>
            <div className="border border-black rounded-sm m-[5px] bg-[#ffffff]"></div>
          </div>
        </div>
        <div className="border border-black m-[5px] rounded-[10px]"></div>
      </div>
    </div>
  );
};

export default DashboardLayout;
