"use client";

import { SIDEBAR_ITEMS } from "@/constants";
import React from "react";
import SideBar from "./SideBar";
import { useMediaQuery } from "usehooks-ts";
import SideBarMobile from "./SideBarMobile";
import LL from "./LL";

const SideBarClient = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });
  // if (isDesktop) {
  return <LL sidebaritems={SIDEBAR_ITEMS} />;
  // return <SideBar sidebaritems={SIDEBAR_ITEMS} />;
  // }

  // return <SideBarMobile sidebaritems={SIDEBAR_ITEMS} />;
};

export default SideBarClient;
