type InfoDetailProps = {
  icon: React.ReactNode;
  name: string;
  quantity?: number;
  className?: string;
};

export default function InfoDetail(props: InfoDetailProps) {
  return (
    <div className="flex items-center gap-2">
      {props.icon}
      <div>
        <span>{props?.quantity}</span>
        <span className={props?.className}> {props.name}</span>
      </div>
    </div>
  );
}
