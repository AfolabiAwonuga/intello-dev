import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { FolderPlus, LucideIcon } from "lucide-react";
import { Span } from "next/dist/trace";
import { cn } from "@/lib/utils";
// import { SheetClose } from "./ui/sheet";

interface Props extends ButtonProps {
  icon: LucideIcon;
}

const SideBarButton = ({
  icon: Icon,
  className,
  children,
  ...props
}: Props) => {
  return (
    <Button
      variant="destructive"
      className={cn(className)}
      {...props}
      size="sm"
    >
      <Icon color="#ffff" size={20} strokeWidth={1.5} />
      <span className="text-[#ffff] text-sm">{children}</span>
    </Button>
  );
};

export default SideBarButton;

// export const SideBarButtonSheet = ({ ...props }: Props) => {
//   return (
//     <SheetClose asChild>
//       <SideBarButton {...props} />
//     </SheetClose>
//   );
// };
