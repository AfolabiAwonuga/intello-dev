import { ArrowUp, SendHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Message, loggedInUserData } from "@/app/data";
import { Textarea } from "./ui/textarea";
import { useTheme } from "next-themes";
import { Input } from "./ui/input";
//   import { EmojiPicker } from "../emoji-picker";

interface Props {
  sendMessage: (newMessage: Message) => void;
  // isMobile: boolean;
  // className: string;
}

//   export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottomBar({
  sendMessage,
}: // isMobile,
// className,
Props) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  const [blockFill, setBlockFill] = useState("bg-white");
  const [arrowFill, setArrowFill] = useState("black");
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setBlockFill(systemTheme === "dark" ? "bg-black/50" : "bg-white");
      setArrowFill(systemTheme === "dark" ? "white" : "black");
    } else {
      setBlockFill(theme === "dark" ? "bg-black/50" : "bg-white");
      setArrowFill(theme === "dark" ? "white" : "black");
    }
  }, [theme]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: message.length + 1,
        name: loggedInUserData.name,
        avatar: loggedInUserData.avatar,
        message: message.trim(),
      };
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  const autoResize = () => {
    if (inputRef.current) {
      const textarea = inputRef.current;
      textarea.style.height = "auto"; // Reset height to auto to correctly calculate the new scrollHeight
      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scrollHeight if it's larger than the client height
      } else {
        textarea.style.height = "40px"; // Reset to original height (assuming original height is 36px)
      }
    }
  };

  return (
    // <div
    //   className={`p-2 flex justify-between items-center gap-2 ${className} border-2 border-red-700`}
    // >
    <AnimatePresence initial={false}>
      <motion.div
        key="input"
        className="flex flex-grow justify-between space-x-2 "
        layout
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1 }}
        transition={{
          opacity: { duration: 0.05 },
          layout: {
            type: "spring",
            bounce: 0.15,
          },
        }}
        onChange={() => {
          autoResize();
        }}
      >
        {/* <div
          className="flex flex-grow justify-between rounded-[10px] space-x-2  border-2 border-blue-600"
        > */}
        {/* <Textarea
          autoComplete="off"
          value={message}
          ref={inputRef}
          onKeyDown={handleKeyPress}
          onChange={(e) => {
            handleInputChange(e), autoResize();
          }}
          name="message"
          placeholder="Message"
          className={`resize-none max-h-[40px] ${blockFill}`}
        ></Textarea> */}
        <Input
          type="email"
          placeholder="Message"
          className={`h-[40px] ${blockFill}`}
        />
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "default", size: "icon" }),
            `h-[40px] w-[40px] ${blockFill}`,
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
          )}
          onClick={handleSend}
        >
          <ArrowUp
            size={18}
            className="text-muted-foreground"
            color={`${arrowFill}`}
            // fill={`${blockFill}`}
          />
        </Link>
        {/* </div> */}
      </motion.div>
    </AnimatePresence>
    // </div>
  );
}
