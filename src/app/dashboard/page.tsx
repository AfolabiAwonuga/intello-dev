"use client";

import ChatBottomBar from "@/components/ChatBottomBar";
import NavBar from "@/components/NavBar";
import NavBarThree from "@/components/NavBarThree";
import NavBarTwo from "@/components/NavBarTwo";
import React, { useState } from "react";
import { Message, userData } from "../data";
import { Chat } from "@/components/Chat";

// interface Props {
//   // messages?: Message[];
//   // selectedUser: UserData;
//   sendMessage: (newMessage: Message) => void;
//   isMobile: boolean;
// }

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

// { sendMessage, isMobile }: Props

const page = () => {
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div className="h-[calc(100dvh)] grid grid-cols-2">
      <div className="flex flex-col m-[5px] rounded-[10px] overflow-hidden">
        <NavBar />
        <div className="grid grid-rows-[3px_200px_300px]  my-[50px] mx-[40px] rounded-sm gap-7 bg-[#efefef]/50">
          <NavBarThree />
          <div className="border border-black rounded-sm mx-[5px] mt-[10px] bg-[#ffffff]"></div>
          <div className="border border-black rounded-sm m-[5px] bg-[#ffffff]"></div>
        </div>
      </div>
      <div className="m-[5px] border border-black rounded-[10px] overflow-hidden bg-[#dcdcdc]">
        <div className="h-full flex flex-col overflow-y-hidden">
          <Chat
            messages={selectedUser.messages}
            selectedUser={selectedUser}
            isMobile={isMobile}
          />
          {/* <NavBarTwo /> */}
          {/* <ChatBottomBar sendMessage={sendMessage} isMobile={isMobile} /> */}
        </div>
      </div>
    </div>
  );
};

export default page;
