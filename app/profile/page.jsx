"use client";

import { useSession } from "next-auth/react";
import Footer from "../(home)/footer";
import HeaderHome from "../(home)/header";

const Profile = () => {
  const { data } = useSession();

  return (
    <div className="h-screen mx-auto flex flex-col justify-between">
      <HeaderHome />
      <div className="flex flex-col h-full justify-center items-center">
        <div className="flex gap-2">
          <p>gmail :</p>
          <p>{data?.user.email}</p>
        </div>
        <div className="flex gap-3">
          <p>username :</p>
          <p>{data?.user.username}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
