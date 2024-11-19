import HeaderHome from "./(home)/header";
import MineHome from "./(home)/mineHome";
import Brand from "./(home)/brand";
import TrendProducts from "./(home)/trendProducts";
import Footer from "./(home)/footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col text-[#111111] bg-white justify-start items-center">
        <HeaderHome />
        <div className="flex flex-col container mx-auto justify-start items-center">
          <MineHome />
          <TrendProducts />
          <Brand />
        </div>
        <Footer />
      </div>
    </>
  );
}
