interface Props {
  content: string;
}

export default function Chip(props: Props) {
  return (
    <div className="py-0.5 px-3.5 rounded-full body-1 font-medium text-gray-50 bg-gray-800 select-none">
      {props.content}
    </div>
  );
}
