"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import AuthContext from "@/app/context";
import { SignOut } from "@/app/lib/signOut";
import { useSession } from "@/app/hook/UseSession";

const topHead = [
  {
    id: 1,
    title: "dashboard",
  },
  {
    id: 2,
    title: "profile",
  },
  {
    id: 3,
    title: "contact-us",
  },
  {
    id: 4,
    title: "about",
  },
];

export const gender = [
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
    title: "Girls",
  },
  {
    id: 4,
    title: "Boys",
  },
];

const DashboardHeader = () => {
  const { products, setProducts } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [toggleRoute, setToggleRoute] = useState(false);
  const router = useRouter();
  const session = useSession();
  const [loged, setLoged] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = window.localStorage.getItem("loged");
      setLoged(loggedIn);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const confirm = (e, r) => {
    e.preventDefault();
    router.push(`/dashboard/confirm/${r}`);
  };

  const deletProduct = (index) => {
    const newArray = products?.filter((item, i) => i !== index);
    setProducts(newArray);
  };
  return (
    <div className="flex flex-col fixed top-0 z-20  w-full">
      <div className="flex max-md:flex-col-reverse w-full  px-4 py-3 justify-between bg-[#f7f7f7] items-center">
        {isClient && (
          <>
            <div className={`${toggleRoute ? "max-md:h-7" : "max-md:h-0"} overflow-hidden duration-500 flex max-md:gap-3 max-md:w-full max-md:items-center max-md:justify-start`}>
              {topHead.reverse().map((item) => (
                <ul key={item.id} className="flex ">
                  <li className="">
                    <Link className="md:px-6 md:py-4 max-md:text-[8px] uppercase hover:bg-[#e9e9e9]" href={`/${item.title}`}>
                      {item.title}
                    </Link>
                  </li>
                </ul>
              ))}
            </div>
            <div className="flex max-md:justify-between max-md:w-full items-center gap-4">
              <button onClick={() => setToggleRoute(() => (toggleRoute ? false : true))} className="text-black md:hidden text-start">
                <GiHamburgerMenu />
              </button>
              <div className="flex gap-2 items-center">
                <div className="text-white cursor-pointer relative flex justify-end">
                  <div className="flex  flex-col group h-full items-center overflow-hidden text-lg md:text-xl ">
                    <IoPerson color="black" />
                    <div style={{ zIndex: "5" }} className="flex flex-col h-0 overflow-hidden group-hover:h-auto w-28 duration-300 top-full right-0  bg-black rounded-lg absolute items-center">
                      {loged ? (
                        <>
                          <button
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                window.localStorage.removeItem("loged");
                              }
                              SignOut();
                            }}
                            className="px-4 py-2 text-xs  border-b border-black duration-300 hover:border-white text-red-600 hover:text-white font-bold "
                            href={"./login"}
                          >
                            Log out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link className="px-4 py-2 text-xs  border-b border-black duration-300 hover:border-white text-red-600 hover:text-white font-bold " href={"./login"}>
                            Log In
                          </Link>
                          <Link className="px-4 py-2 text-xs  duration-300 text-red-600 hover:text-white font-bold" href={"./signup"}>
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex relative cursor-pointer justify-end">
                  <div className="flex  flex-col group items-center overflow-hidden ">
                    <button onClick={() => setOpen(() => (open ? false : true))} className="relative w-10 text-lg md:text-xl">
                      <span className="absolute text-xs top-0 right-0 text-red-700 ">{products.length}</span>
                      <MdOutlineShoppingBag color="black" />
                    </button>
                    <div className="h-0 rounded-lg duration-300 group-hover:min-h-40 w-60 overflow-auto bg-black text-white absolute right-0 top-full">
                      {products?.length === 0 ? (
                        <div className="h-full text-xs  w-full flex justify-center items-center">No Item !!!</div>
                      ) : (
                        products?.map((item, index) => (
                          <div key={index} className="px-4 py-2 cursor-pointer">
                            <div className="flex w-full justify-between gap-6 items-center border-b p-1">
                              <p onClick={(e) => confirm(e, item.slug)} className="w-1/2">
                                {item.name}
                              </p>
                              <div className="text-red-600 flex gap-2">
                                <p className="">{item.price} $</p>
                                <FaTrash onClick={() => deletProduct(index)} />
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                <div className="group h-[1] overflow-hidden"></div>
              </div>
            </div>
            {/* {open && (
              <div className="h-40 w-40 overflow-hidden bg-black text-white absolute right-4 top-1/3">
                {products?.map((item, index) => (
                  <div key={index} className="flex">
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                  </div>
                ))}
              </div>
            )} */}
          </>
        )}
      </div>
      <div className="md:px-20 bg-white">
        <div className={`${toggleRoute ? "max-md:py-1" : "max-md:py-4"} max-md:duration-500 flex w-full md:p-4 justify-center items-center border-b`}>
          {gender.map((item) => (
            <Link
              href={{
                pathname: "/dashboard/product",
                query: { gender: item.title },
              }}
              className="md:px-6 py-2 px-3 md:text-lg text-xs font-serif font-medium hover:bg-[#f7f7f7] rounded-lg"
              key={item.id}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
