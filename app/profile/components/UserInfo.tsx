"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const name = session?.user?.name;
  const email = session?.user?.email;

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="mb-4 relative h-32 w-32 md:h-48 md:w-48 mx-auto md:mx-0">
        <Image
          className=" rounded-full"
          src={profileImage || "/images/profile.png"}
          alt="User"
          sizes="100vw"
          fill
        />
      </div>
      <div>
        <h2 className="text-xl mb-4">
          <span className="font-bold block">Name: </span> {name}
        </h2>
        <h2 className="text-xl">
          <span className="font-bold block">Email: </span> {email}
        </h2>
      </div>
    </div>
  );
}
