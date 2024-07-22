import { cn } from "@/lib/utils";

interface Props {
  size?: string;
  big?: boolean;
}

export default function Skeleton({ size, big }: Props) {
  return (
    <div
      className={cn(
        "bg-gray-1000/10 animate-pulse",
        size ? size : "w-[160px] h-[44px]",
        big ? "rounded-lg" : "rounded"
      )}
    />
  );
}
