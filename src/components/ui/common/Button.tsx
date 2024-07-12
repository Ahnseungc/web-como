import { cn } from "@/lib/utils";

interface Props {
  content: string;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  content,
  primary,
  className,
  onClick,
}: Props) {
  return (
    <button
      className={cn(
        "w-full py-[15px] rounded-md border border-gray-900",
        primary ? "bg-gray-900" : "bg-gray-50",
        className
      )}
      onClick={onClick}
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
