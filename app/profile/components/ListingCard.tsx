import { PropertyProps } from "@/types/properties-types";
import Image from "next/image";
import Link from "next/link";

type ListingCardProps = {
  property: PropertyProps;
  handleDeleteProperty: (id: string) => {};
};

export default function ListingCard(props: ListingCardProps) {
  const { property } = props;

  return (
    <div className="mb-10">
      <Link href={`/properties/${property._id}`}>
        <div className="relative h-96 w-full">
          <Image
            className="rounded-md object-cover"
            src={property?.images ? property.images[0] : ""}
            alt="Property 1"
            sizes="100vw"
            fill
            priority
          />
        </div>
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {`${property.location?.city} ${property.location?.state}`}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => props.handleDeleteProperty(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
