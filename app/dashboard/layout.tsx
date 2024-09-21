"use client";

import { ReactNode, useState } from "react";

import Aside from "@/components/Aside";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [navBorders, setNavBorders] = useState("border-black");
  return (
    <div className="md:grid md:grid-cols-[auto_1fr] min-h-screen">
      {/* <nav className="border-2 border-red-600 h-[60px] mx-[10px] rounded-sm ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
        
            <Avatar
              className={`border ${navBorders} h-9 w-9 cursor-pointer ml-1`}
            >
              <AvatarFallback>NU</AvatarFallback>
              <AvatarImage src="https://avatars.githubusercontent.com/u/109032587?v=4" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="right">
            <DropdownMenuItem className={`border  ${navBorders}`}>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      
        <div className="flex-1 flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className={`border  ${navBorders}`}>
                Config
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Config</DialogTitle>
                <DialogDescription>
                  Make changes to Question Agent&apos;s configuration here.
                  Click save when you are done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Field
                  </Label>
                  <Input
                    id="name"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Topic
                  </Label>
                  <Input
                    id="username"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogTrigger>
                  <Button
                    type="submit"
                    onClick={() => {
                      if (response) {
                        setResponse(null);
                        setQuestionCount(0);
                      }
                    }}
                  >
                    Save changes
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      
        <div className="ml-auto mr-1">
          <ThemeToggle borderColor={`${navBorders}`} />
        </div>
      </nav> */}
      <Aside />
      <div className="h-screen grid grid-rows-[50px_1fr]">{children}</div>
    </div>
  );
}
