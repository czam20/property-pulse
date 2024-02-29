import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/utils/requests";
import { PropertyCardProps } from "@/types";

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p className="text-center">There's no properties to show</p>
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
