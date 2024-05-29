import NavBar from "@/components/NavBar";
import NavBarThree from "@/components/NavBarThree";
import NavBarTwo from "@/components/NavBarTwo";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-2 ">
      <div className="flex flex-col m-[5px] rounded-[10px]">
        <NavBar />
        <div className="grid grid-rows-[3px_200px_300px]  my-[50px] mx-[40px] rounded-sm gap-7 bg-[#efefef]/60">
          {/* <NavBarThree /> */}
          <div className="border border-black rounded-sm mx-[5px] mt-[10px] bg-[#ffffff]"></div>
          <div className="border border-black rounded-sm m-[5px] bg-[#ffffff]"></div>
        </div>
      </div>
      <div className="border border-black m-[5px] rounded-[10px]">
        <NavBarTwo />
      </div>
    </div>
  );
};

export default page;
