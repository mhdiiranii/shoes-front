"use client";

import Link from "next/link";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { SignOut } from "../lib/signOut";
import { useSession } from "../hook/UseSession";
import { GiHamburgerMenu } from "react-icons/gi";

const topHeader = [
  {
    id: 1,
    title: "Men",
  },
  {
    id: 2,
    title: "Women",
  },
  {
    id: 3,
    title: <RxDashboard />,
  },
  {
    id: 4,
    title: "Girls",
  },
  {
    id: 5,
    title: "Boys",
  },
];

const HeaderHome = () => {
  const [hover, setHover] = useState(false);
  const [detect, setDetect] = useState();
  const [toggle, setToggle] = useState(false);

  const onHover = (id) => {
    setHover(true);
    setDetect(id);
  };

  const session = useSession();


  const loged = localStorage.getItem('loged')

  return (
    <div className="flex max-md:flex-col-reverse max-md:absolute top-0 z-50 bg-black p-2 w-full justify-between md:items-center">
      <div className="w-full flex max-md:hidden ">
        <Image src={"/logo.png"} width={100} height={100} alt="logo" />
      </div>
      <div className={`${toggle ? "h-full" : "h-0"} flex  max-md:overflow-hidden w-full justify-center gap-1 items-center`}>
        {topHeader.map((item) => (
          <div
            className="relative border-b group cursor-pointer border-black hover:border-white duration-300  flex justify-center items-center w-20 h-10"
            onMouseMove={() => onHover(item.id)}
            onMouseLeave={() => setHover(false)}
            key={item.id}
          >
            <Link
              href={{
                pathname: item.id === 3 ? "/dashboard" : "/dashboard/product",
                query: item.id === 3 ? "" : { gender: item.title },
              }}
              className={`md:text-lg text-sm font-serif font-medium text-white ${item.id === 3 && "duration-100 group-hover:text-red-600"} `}
            >
              {item.title}
            </Link>
            {hover && item.id === detect && <div className="w-full text-center py-1 rounded-xl bg-red-500 absolute top-full mt-2 text-xs text-white">{item.id === 3 ? "Dashboard" : item.title}</div>}
          </div>
        ))}
      </div>
      <div className="text-white flex max-md:justify-between justify-end w-full">
        <button onClick={() => setToggle(() => (toggle ? false : true))} className="text-white md:hidden text-start">
          <GiHamburgerMenu/>
        </button>
        <div className="flex  flex-col group items-center overflow-hidden ">
          <IoPerson size={25} />
          <div style={{ zIndex: "5" }} className="flex flex-col h-0 overflow-hidden group-hover:h-auto duration-300 top-9 right-1  bg-black rounded-lg absolute items-center">
            {loged ? (
              <>
                <button
                  onClick={() => {
                    localStorage.removeItem('loged')
                    SignOut();
                  }}
                  className="px-4 py-2  border-b border-black duration-300 hover:border-white text-red-600 hover:text-white font-bold "
                  href={"./login"}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link className="px-4 py-2  border-b border-black duration-300 hover:border-white text-red-600 hover:text-white font-bold " href={"./login"}>
                  Sign In
                </Link>
                <Link className="px-4 py-2  duration-300 text-red-600 hover:text-white font-bold" href={"./signup"}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
