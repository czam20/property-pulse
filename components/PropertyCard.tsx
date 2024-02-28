import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBath, FaBed, FaMoneyBill, FaRulerCombined } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

type PropertyCardProps = {
  _id: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds?: number;
  baths?: number;
  square_feet?: number;
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  images: Array<string>
};

export default function PropertyCard(props: PropertyCardProps) {
  const getRateDisplay = () => {
    const { rates } = props;

    if (rates?.monthly) {
      return `$${rates.monthly}/mo`;
    } else if (rates?.weekly) {
      return `$${rates.weekly}/wk`;
    } else if (rates?.nightly) {
      return `$${rates.nightly}/night`;
    }

    return ""
  };

  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        src={`/images/properties/${props.images[0]}`}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{props.type}</div>
          <h3 className="text-xl font-bold">{props.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          {props.beds ? (
            <PropertyDetail
              icon={<FaBed />}
              name="Beds"
              quantity={props.beds}
            />
          ) : null}

          {props.baths ? (
            <PropertyDetail
              icon={<FaBath />}
              name="Baths"
              quantity={props.baths}
            />
          ) : null}

          {props.square_feet ? (
            <PropertyDetail
              icon={<FaRulerCombined />}
              name="sqft"
              quantity={props.square_feet}
            />
          ) : null}
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {props.rates?.nightly ? (
            <PropertyDetail icon={<FaMoneyBill />} name="Nightly" />
          ) : null}
          {props.rates?.weekly ? (
            <PropertyDetail icon={<FaMoneyBill />} name="Weekly" />
          ) : null}
          {props.rates?.monthly ? (
            <PropertyDetail icon={<FaMoneyBill />} name="Monthly" />
          ) : null}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="mb-4 lg:mb-0 text-orange-700">
            <PropertyDetail
              icon={<FaLocationDot />}
              name={`${props.location.city} ${props.location.state}`}
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

type PropertyDetailProps = {
  icon: React.ReactNode;
  name: string;
  quantity?: number;
};

function PropertyDetail(props: PropertyDetailProps) {
  return (
    <div className="flex items-center gap-2">
      {props.icon}
      <div>
        <span>{props?.quantity}</span>
        <span className="md:hidden lg:inline"> {props.name}</span>
      </div>
    </div>
  );
}
