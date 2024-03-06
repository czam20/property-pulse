import InfoDetail from "@/components/InfoDetail";
import { PropertyProps } from "@/types/properties-types";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa";

type PropertyDescriptionProps = {
  property: PropertyProps;
};

export default function PropertyDescription(props: PropertyDescriptionProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-bold mb-6">Description & Details</h3>
      <div className="flex items-center gap-4 text-blue-500 mb-4 text-base space-x-9">
        <InfoDetail
          icon={<FaBed />}
          name="Beds"
          quantity={props.property?.beds}
          className="hidden lg:inline"
        />
        <InfoDetail
          icon={<FaBath />}
          name="Baths"
          quantity={props.property?.baths}
          className="hidden lg:inline"
        />
        <InfoDetail
          icon={<FaRulerCombined />}
          name="sqft"
          quantity={props.property?.square_feet}
          className="hidden lg:inline"
        />
      </div>
      <p className="text-gray-500">{props.property?.description}</p>
    </div>
  );
}
