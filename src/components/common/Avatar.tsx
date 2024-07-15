import Image from "next/image";

interface Props {
  src?: string | null;
}

export default function Avatar({ src }: Props) {
  return (
    <>
      {src ? (
        <Image src={src} alt="프로필" className="w-8 h-8 rounded-full" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-400" />
      )}
    </>
  );
}
