import { PropertyCardProps } from "@/types/properties-types";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
import { getProperties } from "@/utils/requests";

export default async function FeaturedProperties() {
  const properties = await getProperties(true);

  if (properties.length === 0) return null;

  return (
    <section className="px-4 py-6 bg-blue-50">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">
          Featured Properties
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property: PropertyCardProps) => (
            <FeaturedPropertyCard key={property?._id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
}
