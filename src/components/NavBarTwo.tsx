"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
// "./ui/navigation-menu";
import { Circle } from "lucide-react";
import React from "react";

const NavBarTwo = () => {
  return (
    <div className="flex justify-center">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-row space-x-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xs">
              sol agent
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xs">
              rag agent
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavBarTwo;
