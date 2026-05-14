import React from "react";
const NotFound = () => {
 return (
    <div className="flex flex-col justify-center items-center text-center bg-slate-900 py-3" style={{background:`${"white"}`}}>
      <img src="/assets/images/all-img/404-2.svg" alt="" />
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <div className="text-base font-normal mb-10" style={{color:`${"#1e293b"}`,fontSize:"40px",lineHeight:"50px"}}>
           No Details Found
        </div>
      </div>
    </div>
  );
};

export default NotFound;
