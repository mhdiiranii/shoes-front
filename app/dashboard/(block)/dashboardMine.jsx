"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { Fascinate_Inline, Cormorant } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import Api from "@/app/api/api";
import Loading from "@/app/(loading)/loading";
import AuthContext from "@/app/context";

const fascinateInline = Fascinate_Inline({ weight: "400", subsets: ["latin"] });
const cormorant = Cormorant({ weight: "700", subsets: ["latin"] });

const DashboardMine = () => {
  const [myProduct, setMyProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const query = "page=" + page;
  const [allPages, setAllPages] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [allDataCount, setAllDataCount] = useState();
  const router = useRouter();
  const { selectProduct, setSelectProduct } = useContext(AuthContext);
  console.log(query)
  useMemo(() => {
    setLoading(true);
    Api()
      .getProduct(query)
      .then((res) => {
        setMyProduct(res.data.data);
        setAllDataCount(res.data.length)
        setLoading(false);
      });
  }, [page,query]);

  const nextBtn = () => {
    const length = allDataCount;

    if (page !== length) {
      setPage(() => page + 1);
      setPageCount(() => pageCount + 1);
    } else {
      setPage(1);
      setPageCount(1);
    }
  };
  const previousBtn = () => {
    const length = allDataCount;
    if (page === 1) {
      setPage(() => length);
      setPageCount(() => length);
    } else {
      setPage(() => page - 1);
      setPageCount(() => pageCount - 1);
    }
  };

  const submitDiv = (e, r) => {
    e.preventDefault();
    router.push(`/dashboard/${r}`);
  };

  const select = (name, price , slug) => {
    setSelectProduct({
      name,
      price,
      slug
    });
  };
  
  return (
    <>
      {loading ? (
        <div className="pt-5 flex justify-center w-full">
          <Loading size={'2xl'} />
        </div>
      ) : (
        <div className="flex flex-col w-full md:w-4/5 max-md:mt-6 p-3">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {myProduct?.map((item, index) => (
              <div key={index} className="flex  bg-[#f7f7f7] flex-col">
                <div className="w-full flex justify-end items-center ">
                  <button onClick={() => select(item.brand_name, item.retail_price_cents,item.slug)} className="p-2 mr-2">
                    <FaPlus size={14} />
                  </button>
                </div>
                <div onClick={(e) => submitDiv(e, item.slug)} className="relative cursor-pointer hover:shadow-2xl flex flex-col gap-4 duration-500  px-4 rounded-md" >
                  <div className="w-full flex pb-4 justify-center items-center">
                    <Image src={item.main_picture_url} width={150} height={150} alt="shoes" />
                  </div>
                  <div className="flex flex-col w-full justify-start items-start">
                    <div className="flex items-center w-full justify-between">
                      <p className={`${fascinateInline.className} text-lg`}>{item.brand_name}</p>
                      <p className="text-[10px]">{item.gender[0]}</p>
                    </div>
                    <p className={`${cormorant.className} text-xs border-t w-full`}>{item.category[0]}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-200 p-2 rounded-md">
                    <span className={`${cormorant.className} text-sm`}>color</span>
                    <span style={{ backgroundColor: item.color }} className="w-4 h-4 opacity-50 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className={`${cormorant.className} text-lg`}>{item.release_year}</span>
                    <span className="{`${cormorant.className} text-lg`}">{item.retail_price_cents} $</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full justify-center items-center py-6 ">
            <button className="p-3 rounded-full font-extralight hover:bg-[#e9e9e9] text-2xl" onClick={previousBtn}>
              <GrFormPreviousLink />
            </button>
            <span className="px-3 text-lg">{pageCount}</span>
            <button className="p-3 rounded-full font-extralight hover:bg-[#e9e9e9] text-2xl" onClick={nextBtn}>
              <GrFormNextLink />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardMine;
