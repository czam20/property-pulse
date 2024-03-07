"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Loading from "@/components/Loading";
import { PropertyCardProps } from "@/types/properties-types";
import { toast } from "react-toastify";

export default function SavedPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookmarkedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data.bookmarks);
        } else {
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    };

    getBookmarkedProperties();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p className="text-center">No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property: PropertyCardProps) => (
              <PropertyCard key={property?._id} {...property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
