"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import { PropertyCardProps } from "@/types/properties-types";
import Loading from "@/components/Loading";
import SearchProperty from "@/components/SearchProperty";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const type = searchParams.get("propertyType");

  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${type}`
        );

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

    getProperties();
  }, [location, type]);

  return (
    <>
      <section className="px-4 py-6 bg-blue-700">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <SearchProperty
            initialValues={{
              location: location ?? "",
              type: type ?? "All",
            }}
          />
        </div>
      </section>
      <section className="px-4 py-6">
        {loading ? (
          <Loading />
        ) : (
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/properties"
              className="flex gap-2 items-center text-blue-500"
            >
              <FaArrowLeft /> Back to properties
            </Link>
            <h2 className="text-center text-xl font-bold mb-4">
              Search results
            </h2>
            {properties.length === 0 ? (
              <p className="text-center mt-6">No searchs results</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property: PropertyCardProps) => (
                  <PropertyCard key={property?._id} {...property} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
