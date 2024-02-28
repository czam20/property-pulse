import PropertyCard from "@/components/PropertyCard";
import properties from "@/properties.json";

export default function PropertiesPage() {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property?._id} {...property} />
            ))}
          </div>
        ) : (
          <p className="text-center">There's no properties to show</p>
        )}
      </div>
    </section>
  );
}