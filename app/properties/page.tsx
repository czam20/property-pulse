import SearchProperty from "@/components/SearchProperty";
import Properties from "@/components/Properties";

export default async function PropertiesPage() {

  return (
    <>
      <section className="px-4 py-6 bg-blue-700">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <SearchProperty />
        </div>
      </section>
      <Properties pageSize={6} pagination />
    </>
  );
}
