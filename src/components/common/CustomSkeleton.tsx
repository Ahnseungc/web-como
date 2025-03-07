import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = Partial<Pick<ComponentProps<"div">, "className">>;

export default function CustomSkeleton({ className }: Props) {
  return (
    <div
      className={cn(
        "aspect-square w-[20rem] animate-pulse rounded-[6px] bg-gray-1000/10",
        className
      )}
    />
  );
}
