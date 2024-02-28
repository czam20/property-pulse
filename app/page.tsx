import Hero from "@/components/Hero";
import InfoBox from "@/components/InfoBox";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import properties from "@/properties.json";

export default function Home() {
  return (
    <>
      <Hero />

      <section>
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoBox
              title="For Renters"
              description="Find your dream rental property. Bookmark properties and contact
              owners."
            >
              <Link
                href="/properties"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                Browse Properties
              </Link>
            </InfoBox>
            <InfoBox
              title="For Property Owners"
              description="List your properties and reach potential tenants. Rent as an
              airbnb or long term."
              bgColor="bg-blue-100"
            >
              <Link
                href="/properties/add"
                className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
              >
                Add Property
              </Link>
            </InfoBox>
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PropertyCard {...properties[0]}/>
            <PropertyCard {...properties[1]}/>
            <PropertyCard {...properties[2]}/>
          </div>
        </div>
      </section>
    </>
  );
}
