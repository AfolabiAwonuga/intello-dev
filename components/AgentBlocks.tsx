"use client";

import NavBarThree from "@/components/NavBarThree";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Badge } from "@/components/ui/badge";
import { useChat } from "ai/react";
import Link from "next/link";
import { ArrowUp, LogOut } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "./ui/drawer";
import { useMediaQuery } from "@/hooks/mediaQuery";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ITEMS } from "@/constants";
import SideBarButton from "./SideBarButton";

interface QuizResponse {
  question: string;
  choices: { [key: string]: string };
  rightChoice: string;
  hint: string;
}

export default function AgentBlocks(props: { imageUrl: string }) {
  const { imageUrl } = props;
  const isMobile = useMediaQuery(425);

  const [blockFill, setBlockFill] = useState("bg-white");
  const [navBorders, setNavBorders] = useState("border-black");
  const [textColor, setTextColor] = useState("text-black");
  const { theme, resolvedTheme } = useTheme();
  const [response, setResponse] = useState<QuizResponse | null>(null);
  const [field, setField] = useState("");
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const drawerTriggerRef = useRef<HTMLButtonElement>(null); // Create a ref for the DrawerTrigger

  const handleOpenDrawer = () => {
    drawerTriggerRef.current?.click();
  };

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
    setMessages,
  } = useChat({
    api: "/api/solagent",
    initialMessages: [
      {
        id: "1",
        role: "system",
        content: `I am a problem solver, i love to teach and can break things down to a level anyone can understand. My task is to solve the MCQ problems given to me, teach my solution, and engage in an educational conversation about the problem.`,
      },
    ],
    // streamProtocol: "text",
  });
  // console.log(messages);

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setBlockFill(systemTheme === "dark" ? "bg-black/50" : "bg-white");
      setNavBorders(systemTheme === "dark" ? "border-white" : "border-black");
      setTextColor(systemTheme === "dark" ? "text-white" : "text-black");
    } else {
      setBlockFill(theme === "dark" ? "bg-black/50" : "bg-white");
      setNavBorders(theme === "dark" ? "border-white" : "border-black");
      setTextColor(theme === "dark" ? "text-white" : "text-black");
    }
  }, [theme]);

  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView(false);
  };

  // AUTO SCROLL ON NEW MESSAGES IN SOL AGENT BLOCK
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {/* MAIN NAV */}
      <nav className="rounded-[10px] ml-[8px] flex items-center mx-[10px]">
        {/* field, topic, mode - Dashboard pass props to change values for diff pages */}
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Avatar className={`border ${navBorders} h-9 w-9 cursor-pointer`}>
                <AvatarFallback>NU</AvatarFallback>
                <AvatarImage src={imageUrl} />
              </Avatar>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={`w-[150px] bg-black rounded-[10px] `}
            >
              <div className="py-[10px] mx-2 flex flex-col h-full gap-1 ">
                {ITEMS.links.map((link, idx) => (
                  <Link key={idx} href={link.href!}>
                    <SideBarButton
                      variant="ghost"
                      icon={link.icon}
                      className={` ${"gap-2 justify-normal w-32"}`}
                    >
                      {link.label}
                    </SideBarButton>
                  </Link>
                ))}
                <SideBarButton
                  variant="ghost"
                  icon={LogOut}
                  className={` ${"gap-2 justify-normal w-32 mt-auto"}`}
                >
                  <LogoutLink>Logout</LogoutLink>
                </SideBarButton>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* Avatar becomes the button trigger */}
              <Avatar className={`border ${navBorders} h-9 w-9 cursor-pointer`}>
                <AvatarFallback>NU</AvatarFallback>
                <AvatarImage src={imageUrl} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right">
              <DropdownMenuItem className={`border  ${navBorders}`}>
                <LogoutLink>Logout</LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <div className="flex-1 flex justify-between mx-2 md:justify-center md:mx-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className={`border  ${navBorders}`}>
                Config
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center w-[250px] rounded-sm md:w-[300px]">
              <DialogHeader className="flex flex-col items-center">
                <DialogTitle>Edit Config</DialogTitle>
                <DialogDescription>Configure Question Agent.</DialogDescription>
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
          {/* SOL AGENT MOBILE - TODO render only on mobile use mediaquery custom hook  */}
          {isMobile && (
            <div className="md:hidden flex-1 flex justify-end">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    ref={drawerTriggerRef}
                    variant="outline"
                    className={`border  ${navBorders}`}
                  >
                    Sol
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="mx-[10px]">
                  <Card className="bg-gray-400/30 h-full grid grid-rows-[min-content_1fr_min-content] border border-black">
                    <CardHeader className="">
                      <CardTitle className="flex items-center">
                        <Badge>Sol Agent</Badge>
                      </CardTitle>
                      <CardDescription>
                        {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorem */}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-0 ">
                      {/* ScrollArea/ */}
                      <ScrollArea
                        // h-full max-h-[500px]
                        className="h-[500px] overflow-y-auto"
                      >
                        <div ref={messagesRef}>
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              layout
                              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                              // transition={{
                              //   opacity: { duration: 0.1 },
                              //   layout: {
                              //     type: "spring",
                              //     bounce: 0.3,
                              //     duration: messages.indexOf(message) * 0.05 + 0.2,
                              //   },
                              // }}
                              style={{
                                originX: 0.5,
                                originY: 0.5,
                              }}
                              className={cn(
                                "flex flex-col gap-2 py-16 pt-0 pr-6 whitespace-pre-wrap",
                                message.role === "user"
                                  ? "items-end"
                                  : "items-start"
                              )}
                            >
                              <div key={message.id} className="flex gap-2">
                                {message.role !== "user" && (
                                  <>
                                    <span
                                      className={`flex ${blockFill} p-2 rounded-[10px] max-w-lg text-sm border border-black`}
                                    >
                                      <Markdown
                                        remarkPlugins={[remarkGfm]}
                                        className="p"
                                      >
                                        {message.content}
                                      </Markdown>
                                      {/* <p>{message.content}</p> */}
                                    </span>
                                  </>
                                )}
                                {message.role === "user" && (
                                  <>
                                    <span
                                      className={`flex ${blockFill} p-2 rounded-[10px] max-w-md text-sm border border-black`}
                                    >
                                      <p>{message.content}</p>
                                    </span>
                                    <Avatar
                                      className={`h-9 w-9 flex justify-center items-center  border ${navBorders}`}
                                    >
                                      <AvatarFallback>DF</AvatarFallback>
                                      <AvatarImage src={imageUrl} />
                                    </Avatar>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter className="">
                      <div className="flex flex-grow items-center">
                        <form onSubmit={handleSubmit} className="flex w-full">
                          <Input
                            className={`h-[40px] ${blockFill}`}
                            value={input}
                            placeholder="Say something..."
                            onChange={handleInputChange}
                          />
                          <Link
                            href="#"
                            className={cn(
                              buttonVariants({
                                variant: "default",
                                size: "icon",
                              }),
                              `h-[40px] w-[40px] ${blockFill}`,
                              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0 ml-2"
                            )}
                            onClick={handleSubmit}
                          >
                            <ArrowUp
                              size={18}
                              className="text-muted-foreground"
                              // color={`${arrowFill}`}
                              // fill={`${blockFill}`}
                            />
                          </Link>
                        </form>
                      </div>
                    </CardFooter>
                  </Card>
                  {/* <div className="grid gap-4 py-4">Sol Chat</div>
                <DrawerFooter>
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
                </DrawerFooter> */}
                </DrawerContent>
              </Drawer>
            </div>
          )}
        </div>

        <div className="ml-auto">
          <ThemeToggle borderColor={`${navBorders}`} />
        </div>
      </nav>

      {/* MAIN AREA */}
      <div className="md:grid md:grid-cols-2 md:mt-2">
        {/* QA BLOCK */}
        <div className="h-full md:flex md:flex-col rounded-[10px]">
          <div className="grid grid-rows-[3px_min-content_1fr_min-content] md:grid-rows-[3px_min-content_1fr] h-full md:mb-[50px] mx-[10px] rounded-sm gap-7 bg-gray-400/30 border border-black">
            {/* 1 */}
            {response ? (
              <NavBarThree questionCount={questionCount} />
            ) : (
              <Button
                className={`border  m-[20px] ${blockFill} ${textColor} ${navBorders}`}
                variant="outline"
                onClick={async () => {
                  const startMessage = [
                    {
                      id: messages.length.toString(),
                      content: `Start Quiz on ${
                        topic || `a random topic in ${field}`
                      }`,
                      role: "user",
                    },
                  ];
                  // setMessages(messagesWithUserReply);
                  const response = await fetch("/api/mcqagents", {
                    method: "POST",
                    body: JSON.stringify({
                      messages: startMessage,
                    }),
                  });
                  const json = await response.json();
                  // console.log(json);
                  setResponse(json);
                  setQuestionCount((prevCount) => prevCount + 1);
                }}
              >
                Start
              </Button>
            )}

            {/* 2 */}
            {response && (
              <div
                className={`border border-black flex flex-col justify-between rounded-sm mx-[20px] mt-[10px] ${blockFill} overflow-auto`}
              >
                <p className="m-2">{response && response.question}</p>
              </div>
            )}

            {/* 3 */}
            <div
              className={`flex flex-col justify-between rounded-sm m-[5px] overflow-auto`}
            >
              <div className="m-[20px] flex flex-col h-[240px] justify-between gap-5">
                {response &&
                  Object.entries(response.choices).map(
                    ([key, choice], index) => (
                      <>
                        <Button
                          key={index}
                          variant="custom"
                          className={`border border-black justify-start text-left whitespace-normal break-words w-full h-auto hover:bg-none ${
                            selectedChoice === key
                              ? key === response.rightChoice
                                ? `bg-green-800 text-white`
                                : "bg-red-800 text-white"
                              : `${blockFill}`
                          }`}
                          onClick={async () => {
                            setSelectedChoice(key);
                            const fetchNextQuestion = async () => {
                              const startMessage = [
                                {
                                  id: messages.length.toString(),
                                  content: `Start Quiz on ${
                                    topic || `a random topic in ${field}`
                                  }`,
                                  role: "user",
                                },
                              ];
                              const response = await fetch("/api/mcqagents", {
                                method: "POST",
                                body: JSON.stringify({
                                  messages: startMessage,
                                }),
                              });
                              if (!response.ok) {
                                console.error(
                                  "Fetch error:",
                                  response.statusText
                                );
                                return; // Exit if fetch fails
                              }
                              const json = await response.json();
                              setResponse(json);
                              setQuestionCount((prevCount) => prevCount + 1);
                              setSelectedChoice(null);
                            };
                            if (key === response.rightChoice) {
                              // console.log("correct");
                              toast("Good Job!", {
                                icon: "👏",
                                style: {
                                  // border: "1px solid green",
                                  // backgroundColor: "#166534",
                                  // color: "white",
                                },
                              });
                              await fetchNextQuestion();
                            } else {
                              toast("Oops try again, click hint 😉", {
                                // icon: "🤡",
                                style: {
                                  // border: "1px solid red",
                                  // backgroundColor: "#991b1b",
                                  // color: "white",
                                },
                              });
                            }
                          }}
                        >
                          {`${key}.) ${choice}`}
                        </Button>
                        <Toaster
                          position="top-left"
                          containerStyle={{
                            top: 5,
                            left: 150,
                            // bottom: 20,
                            // right: 500,
                          }}
                        />
                      </>
                    )
                  )}
              </div>
            </div>

            {/* 4*/}
            {response && (
              <div className={`flex justify-between m-[5px]`}>
                <DropdownMenu
                  onOpenChange={(open) => {
                    if (open && response) {
                      setInput(
                        `${response.question} CHOICES: ${Object.entries(
                          response.choices
                        )
                          .map(([key, choice]) => `${key}.) ${choice}`)
                          .join(" ")}`
                      );
                    } else {
                      setInput((prev) => "");
                    }
                  }}
                >
                  <DropdownMenuTrigger asChild className="border border-black">
                    <Button
                      variant="outline"
                      className={`${navBorders} ${blockFill}`}
                    >
                      {/* click hint to auto ask solution agent for more info */}
                      Hint
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className={`border ${navBorders}`}
                    align="start"
                    side="top"
                  >
                    <DropdownMenuItem
                      className={`flex flex-grow max-w-[200px]`}
                      onClick={() => {
                        if (response) {
                          handleOpenDrawer();
                          handleSubmit();
                        }
                      }}
                    >
                      {response && response.hint}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  className={`border ${navBorders} ${blockFill}`}
                  variant="outline"
                  onClick={async () => {
                    const startMessage = [
                      {
                        id: messages.length.toString(),
                        content: `Start Quiz on ${
                          topic || `a random topic in ${field}`
                        }`,
                        role: "user",
                      },
                    ];
                    // setMessages(messagesWithUserReply);
                    const response = await fetch("/api/mcqagents", {
                      method: "POST",
                      body: JSON.stringify({
                        messages: startMessage,
                      }),
                    });
                    const json = await response.json();
                    // console.log(json);
                    setResponse(json);
                    setQuestionCount((prevCount) => prevCount + 1);
                    setSelectedChoice(null);
                  }}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* SOL AGENT BLOCK */}
        <div className="hidden md:block rounded-[10px] mb-[50px] mr-[10px]">
          <Card className="bg-gray-400/30 h-full grid grid-rows-[min-content_1fr_min-content] border border-black">
            <CardHeader className="">
              <CardTitle className="flex items-center">
                <Badge>Sol Agent</Badge>
              </CardTitle>
              <CardDescription>
                {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolorem */}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0 ">
              {/* ScrollArea/ */}
              <ScrollArea
                // h-full max-h-[500px]
                className="h-[500px] overflow-y-auto"
              >
                <div ref={messagesRef}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      layout
                      initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                      // transition={{
                      //   opacity: { duration: 0.1 },
                      //   layout: {
                      //     type: "spring",
                      //     bounce: 0.3,
                      //     duration: messages.indexOf(message) * 0.05 + 0.2,
                      //   },
                      // }}
                      style={{
                        originX: 0.5,
                        originY: 0.5,
                      }}
                      className={cn(
                        "flex flex-col gap-2 py-16 pt-0 pr-6 whitespace-pre-wrap",
                        message.role === "user" ? "items-end" : "items-start"
                      )}
                    >
                      <div key={message.id} className="flex gap-2">
                        {message.role !== "user" && (
                          <>
                            <span
                              className={`flex ${blockFill} p-2 rounded-[10px] max-w-lg text-sm border border-black`}
                            >
                              <Markdown
                                remarkPlugins={[remarkGfm]}
                                className="p"
                              >
                                {message.content}
                              </Markdown>
                              {/* <p>{message.content}</p> */}
                            </span>
                          </>
                        )}
                        {message.role === "user" && (
                          <>
                            <span
                              className={`flex ${blockFill} p-2 rounded-[10px] max-w-md text-sm border border-black`}
                            >
                              <p>{message.content}</p>
                            </span>
                            <Avatar
                              className={`h-9 w-9 flex justify-center items-center  border ${navBorders}`}
                            >
                              <AvatarFallback>DF</AvatarFallback>
                              <AvatarImage src={imageUrl} />
                            </Avatar>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="">
              <div className="flex flex-grow items-center">
                <form onSubmit={handleSubmit} className="flex w-full">
                  <Input
                    className={`h-[40px] ${blockFill}`}
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                  />
                  <Link
                    href="#"
                    className={cn(
                      buttonVariants({ variant: "default", size: "icon" }),
                      `h-[40px] w-[40px] ${blockFill}`,
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0 ml-2"
                    )}
                    onClick={handleSubmit}
                  >
                    <ArrowUp
                      size={18}
                      className="text-muted-foreground"
                      // color={`${arrowFill}`}
                      // fill={`${blockFill}`}
                    />
                  </Link>
                </form>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
