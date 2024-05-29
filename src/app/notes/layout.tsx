import React from "react";
import CustomLayout from "@/components/CustomLayout";

interface Props {
  children: React.ReactNode[];
}

const NoteLayout = ({ children }: Props) => {
  return (
    <div className="grid min-h-screen">
      <CustomLayout>{children}</CustomLayout>
    </div>
  );
};

export default NoteLayout;
