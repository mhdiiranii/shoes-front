// app/not-found.tsx

import Footer from "./(home)/footer";
import HeaderHome from "./(home)/header";

export default function NotFound() {
    return (
      <div className="h-[100vh] flex flex-col  justify-between items-center bg-gray-100">
        <HeaderHome/>
        <h1 className="text-lg font-bold ">404 - Page Not Foundsssssssss</h1>
        <Footer/>
      </div>
    );
  }
  