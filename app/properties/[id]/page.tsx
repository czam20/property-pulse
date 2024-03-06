"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProperty } from "@/utils/requests";
import Loading from "@/components/Loading";
import ContactForm from "@/components/ContactForm";
import {
  FaBookmark,
  FaShare,
} from "react-icons/fa";
import { PropertyProps } from "@/types";
import PropertyHeader from "./components/PropertyHeader";
import PropertyRates from "./components/PropertyRates";
import PropertyDescription from "./components/PropertyDescription";
import PropertyAmenities from "./components/PropertyAmenities";
import CustomButton from "@/components/CustomButton";
import Gallery from "@/components/Gallery";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const propertyData = await getProperty(id as string);
        setProperty(propertyData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) return <Loading />;

  if (!property && !loading) return <div>Property not found</div>;

  if (property)
    return (
      <>
        <PropertyHeader image={property?.images[0] ?? ""} property={property} />

        <section className="bg-blue-50">
          <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
              <main className="lg:col-span-2">
                <PropertyRates rates={property.rates} />
                <PropertyDescription property={property} />

                {property?.amenities && property?.amenities?.length > 0 ? (
                  <PropertyAmenities amenities={property.amenities} />
                ) : null}

                {/* <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <div id="map"></div>
                </div> */}
              </main>

              <aside className="space-y-4 lg:col-span-1">
                <CustomButton text="Bookmark Property"  icon={<FaBookmark className="mr-2" />} />
                <CustomButton text="Share Property" className="bg-orange-500 hover:bg-orange-600" icon={<FaShare className="mr-2" />} />
                <ContactForm />
              </aside>
            </div>
          </div>
        </section>

        <Gallery images={property.images} />
      </>
    );
}
