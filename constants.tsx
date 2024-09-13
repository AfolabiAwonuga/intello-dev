import {
  FolderPlus,
  TrendingUp,
  NotebookPen,
  Home,
  KeySquare,
} from "lucide-react";
import { SideBarItems } from "./types";

export const ITEMS: SideBarItems = {
  links: [
    {
      label: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      label: "Stats",
      href: "/dashboard/stats",
      icon: TrendingUp,
    },
    {
      label: "Items",
      href: "/dashboard/items",
      icon: FolderPlus,
    },
    {
      label: "Notes",
      href: "/dashboard/notes",
      icon: NotebookPen,
    },
  ],
};
