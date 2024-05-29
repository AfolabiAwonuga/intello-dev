"use client";

import React from "react";
import SideBarButton from "./SideBarButton";
import {
  FolderPlus,
  TrendingUp,
  NotebookPen,
  MoreHorizontal,
  Settings,
  LogOut,
  HelpCircle,
  Columns2,
  SquareMenu,
} from "lucide-react";
import { SideBarItems } from "@/types";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Popover, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { PopoverContent } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";

interface Props {
  sidebaritems: SideBarItems;
}

const SideBar = ({ sidebaritems }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="border m-[5px] rounded-[10px] bg-[#292929]">
      <div className="h-full px-3 py-4">
        {/* <p className="mx-3 mt-[40px] text-lg font-semibold text-[#7D8081] text-[14px]">
          Locker
        </p> */}
        <div className="mt-[50px]">
          <div className="flex flex-col gap-1 w-full">
            {sidebaritems.links.map((link, idx) => (
              <Link key={idx} href={link.href}>
                <SideBarButton
                  variant={pathname == link.href ? "secondary" : "ghost"}
                  icon={link.icon}
                  className="w-full"
                >
                  {link.label}
                </SideBarButton>
              </Link>
            ))}
          </div>
          <div className="absolute left-0 top-3 w-full px-3">
            <Separator className="absolute -bottom-3 left-0 w-full bg-[#414749]" />
            <div className="flex justify-between items-center w-full">
              {/* <SquareMenu size={18} color="#7d8081" /> */}
              <div className="flex gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src="https://github.com/afolabiawonuga.png" />
                  {/* <AvatarFallback>Nuga</AvatarFallback> */}
                </Avatar>
                <span className="text-[#7d8081]">Nuga</span>
              </div>
            </div>
          </div>
          {/* <p className="font-semibold text-[#7D8081] text-[14px]">Account</p> */}
          <div className="absolute left-0 bottom-3 w-full px-3">
            <Separator className="absolute -top-3 left-0 w-full bg-[#414749]" />
            <div>
              {/* <Link href="/">
                <SideBarButton icon={Settings} className="w-full" size="sm">
                  Settings
                </SideBarButton>
              </Link> */}
              <Link href="/">
                <SideBarButton icon={HelpCircle} className="w-full" size="sm">
                  Help
                </SideBarButton>
              </Link>
              <SideBarButton icon={LogOut} className="w-full" size="sm">
                Log Out
              </SideBarButton>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
