import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  src?: string | null;
  size?: string;
}

export default function Avatar({ src, size = "w-8 h-8" }: Props) {
  return (
    <div className={cn("relative rounded-full bg-gray-400", size)}>
      {src && (
        <Image
          src={src}
          alt="프로필"
          className="rounded-full"
          fill
          sizes="5vw"
          objectFit="cover"
        />
      )}
    </div>
  );
}
