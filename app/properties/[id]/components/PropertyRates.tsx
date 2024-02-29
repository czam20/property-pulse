import { FaXmark } from "react-icons/fa6";

type PropertyRatesProps = {
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
};

export default function PropertyRates(props: PropertyRatesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h3 className="text-lg font-bold bg-gray-800 text-white px-6 py-3">
        Rates & Options
      </h3>
      <div className="flex flex-col lg:flex-row justify-around p-6 gap-2">
        <RateDetail title="Nightly" rate={props?.rates.nightly} />
        <RateDetail title="Weekly" rate={props?.rates.weekly} />
        <RateDetail title="Monthly" rate={props?.rates.monthly} />
      </div>
    </div>
  );
}

type RateDetailProps = {
  title: string;
  rate: number | undefined;
};

function RateDetail(props: RateDetailProps) {
  return (
    <div className="flex items-center justify-center gap-4 border-b border-gray-200 lg:border-b-0 p-2 lg:p-0">
      <div className="text-gray-500 mr-2 font-bold">{props.title}</div>
      <div className="text-base font-bold">
        {props?.rate ? (
          <span className=" text-blue-500">${props.rate}</span>
        ) : (
          <FaXmark className="text-red-700" />
        )}
      </div>
    </div>
  );
}
