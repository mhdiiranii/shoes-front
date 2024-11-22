"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Api from "@/app/api/api";
import { Fascinate_Inline, Cormorant } from "next/font/google";
import Image from "next/image";
import Loading from "@/app/(loading)/loading";
import { FaPlus } from "react-icons/fa6";
import AuthContext from "@/app/context";
import { Suspense } from "react";

const fascinateInline = Fascinate_Inline({ weight: "400", subsets: ["latin"] });
const cormorant = Cormorant({ weight: "700", subsets: ["latin"] });

function MyProducts(){
  const [myProduct, setMyProduct] = useState();
  const [loading, setLoading] = useState(false);
  const query = useSearchParams();
  const router = useRouter();
  const { setSelectProduct } = useContext(AuthContext);


  useEffect(() => {
    if (!query) return;

    setLoading(true);
    Api()
      .getProduct(query)
      .then((res) => {
        console.log(res.data.data)
        setMyProduct(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.status === 404 || err.status === 500) {
          router.push("/404");
        }
      });
  }, [query]);

  const submitDiv = (e, r) => {
    e.preventDefault();
    router.push(`/dashboard/${r}`);
  };

  const select = (name, price, slug) => {
    setSelectProduct({
      name,
      price,
      slug,
    });
  };

  return loading ? (
    <div className="pt-5 flex justify-center w-full">
      <Loading size={"2xl"} />
    </div>
  ) : (
    <div className="grid mt-36 gap-4 cursor-pointer mx-auto container px-4 md:grid-cols-2 lg:grid-cols-4">
      {myProduct?.map((item, index) => (
        <div key={index} className="flex bg-[#f7f7f7] flex-col">
          <div className="w-full flex justify-end items-center ">
            <button
              onClick={() => select(item.brand_name, item.retail_price_cents, item.slug)}
              className="p-2 mr-2"
            >
              <FaPlus size={14} />
            </button>
          </div>
          <div
            onClick={(e) => submitDiv(e, item.slug)}
            className="relative cursor-pointer hover:shadow-2xl flex flex-col gap-4 duration-500 px-4 rounded-md"
          >
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
              <span
                style={{ backgroundColor: item.color }}
                className="w-4 h-4 opacity-50 rounded-full"
              ></span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className={`${cormorant.className} text-lg`}>{item.release_year}</span>
              <span className={`${cormorant.className} text-lg`}>{item.retail_price_cents} $</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Product = ()=>{
  return(
    <Suspense>
      <MyProducts/>
    </Suspense>
  )
}

export default Product;
