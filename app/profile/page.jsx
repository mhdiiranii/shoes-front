"use client";

import Footer from "../(home)/footer";
import HeaderHome from "../(home)/header";
import { useSession } from "../hook/UseSession";

const Profile = () => {
  const {session} = useSession();
  // console.log(session.session.username);
  
  return (
    <div className="h-screen mx-auto flex flex-col justify-between">
      <HeaderHome />
      <div className="flex flex-col h-full justify-center items-center">
        <div className="flex gap-2">
          <p>gmail :</p>
          <p>{session?.email}</p>
        </div>
        <div className="flex gap-3">
          <p>username :</p>
          <p>{session?.username}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
