"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UserInfo from "./components/UserInfo";
import Listings from "./components/Listings";
import Loading from "@/components/Loading";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId: string) => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/properties/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  if(loading) return <Loading />
  
  return (
    <section className="bg-blue-50 px-24">
      <div className="container m-auto py-24">
        <div className="bg-white p-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
            Your Profile
          </h1>
          <div className="flex flex-col gap-10 md:flex-row">
            <UserInfo />

            <Listings properties={properties} />
          </div>
        </div>
      </div>
    </section>
  );
}
