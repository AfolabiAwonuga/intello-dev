import { ArrowUp, SendHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Message, loggedInUserData } from "@/app/data";
import { Textarea } from "./ui/textarea";
//   import { EmojiPicker } from "../emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Props {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
  className: string;
}

//   export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottomBar({
  sendMessage,
  isMobile,
  className,
}: Props) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

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
    <div
      className={`p-2 flex justify-between w-full items-center gap-2 ${className}`}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full"
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
        >
          <div
            className="flex justify-between max-h-52 rounded-[10px] space-x-2 items-center"
            onChange={() => {
              autoResize();
            }}
          >
            <Textarea
              autoComplete="off"
              value={message}
              ref={inputRef}
              onKeyDown={handleKeyPress}
              onChange={(e) => {
                handleInputChange(e), autoResize();
              }}
              name="message"
              placeholder="Message"
              className="max-h-52 rounded-[10px] resize-none overflow-hidden bg-[#efefef]/80"
              style={{ height: "40px" }}
            ></Textarea>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "default", size: "icon" }),
                "h-[40px] w-[40px] bg-[#292929]",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
              )}
              onClick={handleSend}
            >
              <ArrowUp
                size={18}
                className="text-muted-foreground"
                color="#ffff"
              />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
