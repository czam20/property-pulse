"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import UserInfo from "./components/UserInfo";
import Listings from "./components/Listings";
import Loading from "@/components/Loading";
import { PropertyProps } from "@/types/properties-types";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [properties, setProperties] = useState<Array<PropertyProps>>([]);
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

  const handleDeleteProperty = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });

      if (res.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== id
        );

        setProperties(updatedProperties);

        toast.success("Property deleted");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete property");
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="bg-blue-50 px-24">
      <div className="container m-auto py-24">
        <div className="bg-white p-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
            Your Profile
          </h1>
          <div className="flex flex-col gap-10 md:flex-row">
            <UserInfo />

            <Listings
              properties={properties}
              handleDeleteProperty={handleDeleteProperty}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
