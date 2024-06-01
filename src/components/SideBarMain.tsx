// "use client";
import React, { useState } from "react";
import Link from "next/link";
import SideBarButton from "./SideBarButton";
import { usePathname } from "next/navigation";
import { SideBarItems } from "@/types";
import { Avatar, AvatarImage } from "./ui/avatar";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { Separator } from "./ui/separator";

interface Props {
  mainitems: SideBarItems;
  lockeritems: SideBarItems;
}

const SideBarMain = ({ mainitems, lockeritems }: Props) => {
  // const pathname = usePathname();
  // {pathname == link.href ? "secondary" : "ghost"}
  const [isCollapsed, setCollapsed] = useState<boolean>(true);
  const handleClick = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <>
      <aside
        className={`relative border rounded-[10px] bg-[#292929] transition-all duration-300 ${
          isCollapsed ? "col-span-1 w-[50px]" : "col-span-1"
        }`}
        data-collapse={isCollapsed}
      >
        <button
          className="flex cursor-pointer justify-center items-center absolute right-0 top-[10px] translate-x-1/2"
          onClick={handleClick}
        >
          {!isCollapsed ? (
            <CircleChevronLeft fill="#ffff" strokeWidth={1} size={18} />
          ) : (
            <CircleChevronRight fill="#ffff" strokeWidth={1} size={18} />
          )}
        </button>
        <div className="flex justify-between items-center w-full p-[12px]">
          <div className="flex gap-1.5 items-center">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/afolabiawonuga.png" />
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-[#ffff] text-[10px]">Nuga</span>
                <span className="text-[#ffff]/20 text-[9px]">
                  afolabiawonuga@gmail.com
                </span>
              </div>
            )}
          </div>
        </div>
        <Separator className="bg-[#414749]/15 mb-[15px]" />
        <div className="mt-[5px]">
          <div className="flex flex-col gap-1 w-full">
            {!isCollapsed && (
              <p className="text-[#ffff]/15 px-3 test-[12px]">Main</p>
            )}
            {mainitems.links.map((link, idx) => (
              <Link key={idx} href={link.href!}>
                <SideBarButton
                  variant="ghost"
                  icon={link.icon}
                  className={"w-full"}
                >
                  {!isCollapsed && link.label}
                </SideBarButton>
              </Link>
            ))}
          </div>
          <Separator className="bg-[#414749]/15 mb-[15px]" />
          <div className="flex flex-col gap-1 w-full">
            {!isCollapsed && (
              <p className="text-[#ffff]/15 px-3 test-[12px]">Locker</p>
            )}
            {lockeritems.links.map((link, idx) => (
              <Link key={idx} href={link.href!}>
                <SideBarButton
                  variant="ghost"
                  icon={link.icon}
                  className={"w-full"}
                >
                  {!isCollapsed && link.label}
                </SideBarButton>
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute left-0 top-3 px-3">
          <div className="flex justify-between items-center w-full"></div>
        </div>
      </aside>
    </>
  );
};

export default SideBarMain;
