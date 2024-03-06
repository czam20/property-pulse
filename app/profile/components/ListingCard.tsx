import { PropertyProps } from "@/types/properties-types";
import Image from "next/image";
import Link from "next/link";

export default function ListingCard(props: PropertyProps) {
  return (
    <div className="mb-10">
      <Link href={`/properties/${props._id}`}>
        <div className="relative h-96 w-full">
          <Image
            className="rounded-md object-cover"
            src={props.images[0]}
            alt="Property 1"
            sizes="100vw"
            fill
          />
        </div>
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{props.name}</p>
        <p className="text-gray-600">Address: {`${props.location?.city} ${props.location?.state}`}</p>
      </div>
      <div className="mt-2">
        <Link
          href="/properties/add"
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
