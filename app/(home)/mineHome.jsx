"use client";

import Image from "next/image";
import Link from "next/link";

const MineHome = () => {


  return (
    <div className="md:h-[100vh] max-md:my-10 max-md:px-4 relative flex justify-between w-full items-center">
      {/* <div className="absolute h-full w-full flex justify-end items-center"></div> */}
      <div className="w-full max-md:hidden z-10 relative flex justify-center items-center">
        <Image className="z-10 absolute -top-10 -left-10" src={"/three.png"} width={400} height={400} alt="shoes" />
        <Image className="z-10 absolute top-0 -right-5" src={"/two.png"} width={400} height={400} alt="shoes" />
        <Image className="z-20 shoes-animatio" src={"/one.png"} width={400} height={400} alt="shoes" />
      </div>
      <div className="w-full max-md:items-center max-md:text-center z-10 flex flex-col gap-4  justify-center items-start">
        <h1 className="md:text-6xl text-4xl font-bold">Sport Shoes</h1>
        <div className="md:text-4xl text-2xl flex gap-2 font-semibold">
          <p className="text-red-600">Men's</p>
          <p>Collection</p>
        </div>
        <p className="max-md:text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis obcaecati explicabo porro repellat, officiis possimus enim nostrum dolorum veniam voluptates! Magnam corrupti odit enim
          veritatis eveniet assumenda soluta amet minima?
        </p>
        <Link
          href={{
            pathname: "/dashboard/"
          }}
          className="bg-black text-white font-semibold px-4 py-2 rounded-lg hover:shadow-[0px_5px_5px_5px_rgba(0,0,0,0.3)] hover:text-white duration-300"
        >
          lets Go !
        </Link>
      </div>
    </div>
  );
};

export default MineHome;
