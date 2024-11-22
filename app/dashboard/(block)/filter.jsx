"use client";

import Api from "@/app/api/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Filter = () => {
  const [categorys, SetCategorys] = useState([]);
  const [color, setColor] = useState();
  const [brand, setBrand] = useState();
  const [size, setSize] = useState(34);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    Api()
      .getFilter()
      .then((res) => {
        const cate = res.data.data?.map((item) => item.category).flat();
        const uniqueItems = [...new Set(cate)];
        const deleteSpace = uniqueItems?.map((item) => item.replaceAll("-", " "));
        SetCategorys(deleteSpace);
        const color = res.data.data.map((item) => item.color);
        const newColor = [...new Set(color)];
        setColor(newColor);
        const brand = res.data.data.map((item) => item.brand_name);
        const newArray = [...new Set(brand)];
        setBrand(newArray);
      });
  }, []);

  function open() {
    setToggle(() => (toggle ? false : true));
    
  }
  return (
    <div className={`pl-1 relative max-md:z-40 ${toggle?'max-md:w-[229px]':'w-[29px]'} max-md:fixed max-md:duration-300 max-md:overflow-hidden`}>
      <button onClick={open} className="absolute z-50 md:hidden rounded-r-full w-[25px] -right-0 top-0 p-1 bg-gray-200"><MdKeyboardArrowRight /></button>
      <div className={`${toggle ? 'w-[200px]':'w-0'} max-md:duration-300 z-40 max-md:overflow-hidden md:w-1/5 md:fixed h-[100vh] cursor-pointer bg-gray-200 md:px-2 md:py-2 md:mt-3 text-[#535252]`}>
        <div className="accordion-item max-h-8 duration-700 overflow-y-hidden mb-2 py-1 border-b cursor-pointer border-black">
          <span className="my-1 px-2 font-bold text-sm">Category</span>
          <div className="accordion-content  overflow-hidden duration-700">
            <div className="px-2 py-2 flex flex-col">
              {categorys?.map((item, index) => (
                <Link
                  href={{
                    pathname: "/dashboard/product",
                    query: { category: item.replaceAll(" ", "-") },
                  }}
                  className="my-1 text-xs"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="accordion-item py-1 max-h-8 duration-700 overflow-hidden mb-2 border-b border-black">
          <span className="my-1 px-2 font-bold text-sm">Color</span>
          <div className="accordion-content overflow-hidden duration-700">
            <div className="px-2 py-2 flex justify-between items-center">
              {color?.map((item, index) => (
                <Link
                  href={{
                    pathname: "/dashboard/product",
                    query: { color: item },
                  }}
                  style={{ backgroundColor: item, height: "15px", width: "15px" }}
                  className="my-1 duration-700 rounded-full text-xs"
                ></Link>
              ))}
            </div>
          </div>
        </div>
        <div className="accordion-item max-h-8 duration-700 overflow-hidden py-1 mb-2 border-b border-black">
          <span className="my-1 px-2 font-bold text-sm">Size</span>
          <div className="accordion-content overflow-hidden duration-700">
            <div className="px-2 py-2 gap-1 flex justify-between items-center">
              <input onChange={(e) => setSize(e.target.value)} type="range" defaultValue={34} min="34" max="44" />
              <span>{size}</span>
              <Link
                href={{
                  pathname: "/dashboard/product",
                  query: { size: size },
                }}
                className="px-2 py-1 text-xs border-[1px] rounded-lg border-black "
              >
                ok!
              </Link>
            </div>
          </div>
        </div>
        <div className="accordion-item max-h-8 duration-700 overflow-hidden py-1 mb-2 border-b border-black">
          <span className="my-1 px-2 font-bold text-sm">Brand</span>
          <div className="accordion-content overflow-hidden duration-700">
            <div className="px-2 pb-1 flex flex-col">
              {brand?.map((item, index) => (
                <Link
                  className="my-1 text-xs"
                  href={{
                    pathname: "/dashboard/product",
                    query: { brand: item.replaceAll(" ", "-") },
                  }}
                >
                  {" "}
                  {item}{" "}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
