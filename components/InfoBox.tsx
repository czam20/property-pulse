type InfoBoxProps = {
  title: string;
  description: string;
  bgColor?: string;
  children: React.ReactNode
};

export default function InfoBox(props: InfoBoxProps) {
  return (
    <div className={`${props.bgColor ?? "bg-gray-100"} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{props.title}</h2>
      <p className="mt-2 mb-4">{props.description}</p>
      {props.children}
    </div>
  );
}
