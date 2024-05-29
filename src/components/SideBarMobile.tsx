"use client";

import { SideBarItems } from "@/types";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { HelpCircle, LogOut, Menu, X } from "lucide-react";
import { SideBarButtonSheet as SideBarButton } from "./SideBarButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

interface Props {
  sidebaritems: SideBarItems;
}

const SideBarMobile = ({ sidebaritems }: Props) => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="fixed top-3 left-3">
          <Menu size={18} color="#7d8081" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[200px] px-3 py-4" hideClose>
        <SheetHeader className="flex flex-row justify-between items-center space-y-0">
          {/* <span className="text-lg font-semibold text-foreground mx-3">
            
          </span> */}
          <SheetClose asChild>
            <Button className="h-7 w-7 p-0" variant="ghost">
              <Menu size={18} color="#7d8081" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="h-full">
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
      </SheetContent>
    </Sheet>
  );
};

export default SideBarMobile;
