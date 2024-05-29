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
  sidebaritems: SideBarItems;
}

const SideBarMain = ({ sidebaritems }: Props) => {
  // const pathname = usePathname();
  // {pathname == link.href ? "secondary" : "ghost"}
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const handleClick = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <>
      <aside
        className={`relative border m-[5px] rounded-[10px] bg-[#292929] transition-all duration-300 ${
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
          <div className="flex gap-1.5 items-cente">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/afolabiawonuga.png" />
              {/* <AvatarFallback>Nuga</AvatarFallback> */}
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
        <Separator className="bg-[#414749]/15" />
        <div className="mt-[5px]">
          <div className="flex flex-col gap-1 w-full">
            {sidebaritems.links.map((link, idx) => (
              <Link key={idx} href={link.href}>
                <SideBarButton
                  variant="ghost"
                  icon={link.icon}
                  className={"w-full"}
                >
                  {!isCollapsed && link.label}
                  {/* {link.label} */}
                </SideBarButton>
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute left-0 top-3 px-3">
          {/* <Separator className="absolute -bottom-3 left-0 bg-[#414749]" /> */}
          <div className="flex justify-between items-center w-full">
            {/* <SquareMenu size={18} color="#7d8081" /> */}
            {/* <div className="flex gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src="https://github.com/afolabiawonuga.png" />
                    <AvatarFallback>Nuga</AvatarFallback>
                  </Avatar>
                  <span className="text-[#7d8081]">Nuga</span>
                </div> */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBarMain;
