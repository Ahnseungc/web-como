import { cn } from "@/lib/utils";

interface Props {
  content: string;
  primary?: boolean;
}

export default function Button({ content, primary }: Props) {
  return (
    <button
      className={cn(
        "w-full py-[15px] rounded-md border border-gray-900",
        primary ? "bg-gray-900" : "bg-gray-50"
      )}
    >
      <span
        className={cn(
          "h3 font-bold",
          primary ? "text-gray-50" : "text-gray-900"
        )}
      >
        {content}
      </span>
    </button>
  );
}
