import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    id: 1,
    src: "/brand/veja.jpg",
    query: "Veja",
  },
  {
    id: 2,
    src: "/brand/adidas.svg",
    query: "Adidas",
  },
  {
    id: 3,
    src: "/brand/nike.svg",
    query: "Nike",
  },
  {
    id: 4,
    src: "/brand/puma.svg",
    query: "Puma",
  },
  {
    id: 5,
    src: "/brand/asics.svg",
    query: "Asics",
  },
  {
    id: 6,
    src: "/brand/converse.svg",
    query: "Converse",
  },
  {
    id: 7,
    src: "/brand/jordan.svg",
    query: "Jordan",
  },
  {
    id: 8,
    src: "/brand/new-balance.svg",
    query: "New-Balance",
  },
  {
    id: 9,
    src: "/brand/reebok.svg",
    query: "Reebok",
  },
];

const Brand = () => {
  return (
    <div className="md:h-[100vh] max-md:my-10 w-full">
      <div className="h-full max-md:gap-5 w-full p-4 flex flex-col ">
        <h3 className="w-full text-3xl max-md:text-center max-md:text-xl font-extrabold p-2 rounded-lg bg-[#f7f7f7]">Brands</h3>
        <div className="flex h-full max-md:gap-2 flex-row justify-center  items-center w-full  flex-wrap">
          {brands.map((item) => (
            <Link
              href={{
                pathname: "/dashboard/product",
                query: {brand : item.query}
              }}
              className="md:w-1/4 w-full rounded-md flex py-6 cursor-pointer mx-2 bg-[#f7f7f7] justify-center"
              key={item.id}
            >
              <Image className="rounded-full w-1/2" src={item.src} width={128} height={85} alt="#" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;
