"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Navigation } from "swiper/modules";
import { Suspense } from "react";

import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

const trends = [
  { id: 1, src: "/trend/2.avif" },
  { id: 2, src: "/trend/3.avif" },
  { id: 3, src: "/trend/4.avif" },
  { id: 4, src: "/trend/5.avif" },
  { id: 5, src: "/trend/6.avif" },
  { id: 6, src: "/trend/7.avif" },
  { id: 7, src: "/trend/8.avif" },
  { id: 8, src: "/trend/9.avif" },
  { id: 9, src: "/trend/10.avif" },
  { id: 10, src: "/trend/11.avif" },
  { id: 11, src: "/trend/12.avif" },
  { id: 12, src: "/trend/13.avif" },
];
const newest = [
  { id: 1, src: "/new/1.avif" },
  { id: 2, src: "/new/2.avif" },
  { id: 3, src: "/new/3.avif" },
  { id: 4, src: "/new/4.avif" },
  { id: 5, src: "/new/5.avif" },
  { id: 6, src: "/new/6.avif" },
  { id: 7, src: "/new/7.avif" },
  { id: 8, src: "/new/8.avif" },
  { id: 9, src: "/new/9.avif" },
  { id: 10, src: "/new/10.avif" },
  { id: 11, src: "/new/11.avif" },
  { id: 12, src: "/new/12.avif" },
];

function Trending  () {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine slides per view dynamically
  const slidesPerView = windowWidth >= 728 ? 4 : 1;

  return (
    <div className="w-full select-none">
      {/* Trend Section */}
      <div className="p-4 flex flex-col gap-4 h-1/2">
        <h3 className="w-full max-md:text-center max-md:text-xl text-3xl font-extrabold p-2 rounded-lg bg-[#f7f7f7]">
          Trend
        </h3>
        <div className="flex h-full justify-center item">
          <Swiper
            className="image-shadow rounded-sm relative"
            modules={[Virtual, Navigation]}
            spaceBetween={50}
            navigation
            slidesPerView={slidesPerView}
            virtual
          >
            {trends.map((item, index) => (
              <SwiperSlide className="p-4 rounded-md" key={item.id} virtualIndex={index}>
                <div className="flex items-center relative justify-center h-full ">
                  <Image
                    className="rounded-md"
                    src={item.src}
                    width={300}
                    height={200}
                    alt={`Trend ${item.id}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* New Section */}
      <div className="flex flex-col gap-4 w-full h-1/2 p-4">
        <h3 className="w-full max-md:text-center max-md:text-xl text-3xl font-extrabold p-2 rounded-lg bg-[#f7f7f7]">
          New
        </h3>
        <div className="flex h-full justify-center item">
          <Swiper
            className="image-shadow rounded-sm"
            modules={[Virtual, Navigation]}
            spaceBetween={50}
            navigation
            slidesPerView={slidesPerView}
            virtual
          >
            {newest.map((item, index) => (
              <SwiperSlide className="p-4 rounded-md" key={item.id} virtualIndex={index}>
                <div className="flex items-center justify-center h-full ">
                  <Image
                    className="rounded-lg"
                    src={item.src}
                    width={300}
                    height={200}
                    alt={`Newest ${item.id}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
const TrendProducts = ()=>{
  return(
    <Suspense>
      <Trending/>
    </Suspense>
  )
}
export default TrendProducts;
