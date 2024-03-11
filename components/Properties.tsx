"use client";
import { useState, useEffect } from "react";
import { PropertyCardProps } from "@/types/properties-types";
import PropertyCard from "./PropertyCard";
import Loading from "./Loading";
import Pagination from "./Pagination";

type PropertiesProps = {
  pagination?: boolean;
  pageSize?: number;
};

export default function Properties(props: PropertiesProps) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(props.pageSize || 3);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );

        if (res.status === 200) {
          const { properties: propertiesResult, total } = await res.json();
          setProperties(propertiesResult);
          setTotal(total);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) return <Loading />;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p className="text-center text-lg font-bold">
            There's no properties to show
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property: PropertyCardProps) => (
              <PropertyCard key={property?._id} {...property} />
            ))}
          </div>
        )}
        {props.pagination && (
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={total}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}
