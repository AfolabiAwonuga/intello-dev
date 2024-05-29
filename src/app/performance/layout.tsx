import React from "react";
import CustomLayout from "@/components/CustomLayout";

interface Props {
  children: React.ReactNode[];
}

const PerformanceLayout = ({ children }: Props) => {
  return <CustomLayout>{children}</CustomLayout>;
};

export default PerformanceLayout;
