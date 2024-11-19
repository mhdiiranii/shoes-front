"use client";

import Loading from "@/app/(loading)/loading";
import Api from "@/app/api/api";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    Api()
      .getOneProduct(params.slug)
      .then((res) => {
        setMyData(res.data.data.oneItem);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 404) {
          setLoading(false);
          router.push("/404");
        }
      });
  }, []);
  const confirm = (e, r) => {
    e.preventDefault();
    router.push(`/dashboard/confirm/${params.slug}`);
  };

  return loading ? (
    <div className="pt-5 flex justify-center w-full">
      <Loading size={"2xl"} />
    </div>
  ) : (
    <div className="flex max-lg:flex-col max-lg:gap-6 justify-around items-center py-4 px-4">
      <div className="w-full flex justify-center">
        <Image src={myData.main_picture_url} width={400} height={400} alt="shoes" />
      </div>
      <div className="flex w-full items-start flex-col gap-4">
        <div className="flex flex-col justify-between w-full items-start">
          <h2 className="font-extrabold text-3xl border-b w-full">{myData.brand_name}</h2>
          <div className="text-xs">
            {myData.category?.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <p style={{ backgroundColor: myData.color }} className="text-white p-1.5 rounded-3xl">
          {myData.color}
        </p>
        <div className="flex gap-4">
          {myData.size_range?.map((item, index) => (
            <button key={index} className="bg-gray-300 text-xs px-1.5 py-1 rounded-full">
              {item}
            </button>
          ))}
        </div>
        <div className="flex justify-between w-full">
          <p>{myData.release_year}</p>
        </div>
        <p>{myData.story_html}</p>
        <div className="w-full flex justify-center items-center">
          <button onClick={confirm} className="px-8 py-2 bg-green-600 rounded-lg text-lg font-semibold text-white">
            {myData.retail_price_cents}$
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
