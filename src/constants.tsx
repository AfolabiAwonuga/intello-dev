import { FolderPlus, TrendingUp, NotebookPen, Home } from "lucide-react";
import { SideBarItems } from "./types";

export const SIDEBAR_ITEMS: SideBarItems = {
  links: [
    {
      label: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      label: "Items",
      href: "/items",
      icon: FolderPlus,
    },
    {
      label: "Notes",
      href: "/notes",
      icon: TrendingUp,
    },
    {
      label: "Performance",
      href: "/performance",
      icon: NotebookPen,
    },
  ],
  // extras: (
  //   <div>
  //     <h3>Extras</h3>
  //   </div>
  // )
};
