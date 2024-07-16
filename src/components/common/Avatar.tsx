import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  src?: string | null;
  size?: string;
}

export default function Avatar({ src, size = "w-8 h-8" }: Props) {
  return (
    <>
      {src ? (
        <Image src={src} alt="프로필" className={cn("rounded-full", size)} />
      ) : (
        <div className={cn("rounded-full bg-gray-400", size)} />
      )}
    </>
  );
}
