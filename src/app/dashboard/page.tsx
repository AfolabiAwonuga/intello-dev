import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="grid m-[5px] rounded-[10px]">
        <div className="grid grid-rows-[240px_1fr]  my-[70px] mx-[40px] rounded-sm gap-7 bg-[#efefef]/60">
          <div className="border border-black rounded-sm mx-[5px] mt-[40px] bg-[#ffffff]"></div>
          <div className="border border-black rounded-sm m-[5px] bg-[#ffffff]"></div>
        </div>
      </div>
      <div className="border border-black m-[5px] rounded-[10px]"></div>
    </div>
  );
};

export default page;
