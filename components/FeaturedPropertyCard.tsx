import { PropertyCardProps } from "@/types/properties-types";
import InfoDetail from "./InfoDetail";
import { FaBath, FaBed, FaMoneyBill, FaRulerCombined } from "react-icons/fa";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

export default function FeaturedPropertyCard(props: PropertyCardProps) {
  const getRateDisplay = () => {
    const { rates } = props;

    if (rates?.monthly) {
      return `$${rates.monthly}/mo`;
    } else if (rates?.weekly) {
      return `$${rates.weekly}/wk`;
    } else if (rates?.nightly) {
      return `$${rates.nightly}/night`;
    }

    return "";
  };

  const cardImage =
    props?.images && props?.images?.length > 0 ? props.images[0] : "";

  return (
    <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
      <Image
        src={cardImage}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
      />
      <div className="p-6 md:flex-1">
        <h3 className="text-xl font-bold">{props.name}</h3>
        <div className="text-gray-600 mb-4">{props.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <InfoDetail
            icon={<FaBed />}
            name="Beds"
            quantity={props.beds}
            className="hidden lg:inline"
          />

          <InfoDetail
            icon={<FaBath />}
            name="Baths"
            quantity={props.baths}
            className="hidden lg:inline"
          />

          <InfoDetail
            icon={<FaRulerCombined />}
            name="sqft"
            quantity={props.square_feet}
            className="hidden lg:inline"
          />
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {props.rates?.nightly ? (
            <InfoDetail icon={<FaMoneyBill />} name="Nightly" />
          ) : null}
          {props.rates?.weekly ? (
            <InfoDetail icon={<FaMoneyBill />} name="Weekly" />
          ) : null}
          {props.rates?.monthly ? (
            <InfoDetail icon={<FaMoneyBill />} name="Monthly" />
          ) : null}
        </div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="mb-4 lg:mb-0 text-orange-700">
            <InfoDetail
              icon={<FaLocationDot />}
              name={`${props.location?.city} ${props.location?.state}`}
            />
          </div>
          <Link
            href={`/properties/${props._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
