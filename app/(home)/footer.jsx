"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black flex w-full p-10">
      <div className="flex flex-row-reverse gap-10 justify-end md:w-1/2 text-white text-base font-semibold">
        <div className="flex  flex-col gap-5 max-md:text-sm">
          <Link href={"/contact-us"}>Contact Us</Link>
          <Link href={"/terms-condition"}>Terms & Conditions</Link>
          <Link href={"/about"}>About Us</Link>
        </div>
        <div className="flex flex-col gap-5 max-md:text-sm">
          <Link
            href={{
              pathname: "/dashboard/product",
              query: { gender: "Men" },
            }}
          >
            Mens
          </Link>
          <Link
            href={{
              pathname: "/dashboard/product",
              query: { gender: "Women" },
            }}
          >
            Womens
          </Link>
          <Link
            href={{
              pathname: "/dashboard/product",
              query: { gender: "Boys" },
            }}
          >
            Boys
          </Link>
          <Link
            href={{
              pathname: "/dashboard/product",
              query: { gender: "Girls" },
            }}
          >
            Girls
          </Link>
        </div>
      </div>
      <div className="w-1/2 max-md:hidden flex justify-center items-center">
        <Image src={"/logo.png"} width={100} height={100} alt="logo" />
      </div>
    </div>
  );
};

export default Footer;
