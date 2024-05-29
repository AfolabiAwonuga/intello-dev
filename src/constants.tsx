import {
  FolderPlus,
  TrendingUp,
  NotebookPen,
  Home,
  KeySquare,
} from "lucide-react";
import { SideBarItems } from "./types";

export const MAIN_ITEMS: SideBarItems = {
  links: [
    {
      label: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      label: "Performance",
      href: "/performance",
      icon: TrendingUp,
    },
  ],
  // extras: (
  //   <div>
  //     <h3>Extras</h3>
  //   </div>
  // )
};
export const LOCKER_ITEMS: SideBarItems = {
  links: [
    {
      label: "API key",
      icon: KeySquare,
      // href: "/performance",
    },
    {
      label: "Items",
      href: "/items",
      icon: FolderPlus,
    },
    {
      label: "Notes",
      href: "/notes",
      icon: NotebookPen,
    },
  ],
  // extras: (
  //   <div>
  //     <h3>Extras</h3>
  //   </div>
  // )
};
