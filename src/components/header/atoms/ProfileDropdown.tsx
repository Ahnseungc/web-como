import Image from "next/image";
import ChevronDown from "@/assets/icons/chevron_down.svg";

interface Props {
  profileImage?: string | null;
}

export default function ProfileDropdown({ profileImage }: Props) {
  return (
    <div className="flex items-center gap-2">
      {profileImage ? (
        <Image
          src={profileImage}
          alt="프로필"
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-400" />
      )}
      <Image src={ChevronDown} alt="▼" width={24} height={24} />
    </div>
  );
}
