import InfoDetail from "@/components/InfoDetail";
import { FaCheck } from "react-icons/fa";

type PropertyAmenitiesProps = {
    amenities: Array<string>;
}

export default function PropertyAmenities(props: PropertyAmenitiesProps){
    return <div className="bg-white p-6 rounded-lg shadow-md mt-6">
    <h3 className="text-lg font-bold mb-6">Amenities</h3>
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 list-none">
      {props?.amenities?.map((amenity: string) => {
        return (
          <li>
            <InfoDetail
              icon={<FaCheck className="text-green-600" />}
              name={amenity}
            />
          </li>
        );
      })}
    </ul>
  </div>
}