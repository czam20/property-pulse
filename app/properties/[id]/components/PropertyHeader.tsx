import InfoDetail from "@/components/InfoDetail";
import { PropertyProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

type PropertyHeaderProps = {
  image: string;
  property: PropertyProps;
};

export default function PropertyHeader(props: PropertyHeaderProps) {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={props.image}
            alt=""
            className="object-cover h-[500px] w-full"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
      <div className="container m-auto p-6">
        <span className="text-gray-500">{props.property?.type}</span>
        <h2 className="text-2xl font-bold my-2">{props.property?.name}</h2>
        <div className="text-gray-500 mb-4">
          <InfoDetail
            icon={<FaLocationDot />}
            name={`${props.property?.location?.street} ${props.property?.location?.city}, ${props.property?.location?.state} ${props.property?.location?.zipcode}`}
          />
        </div>
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
        >
          <FaArrowLeft />
          Back to Properties
        </Link>
      </div>
    </section>
  );
}
