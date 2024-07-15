"use client";

import Image from "next/image";
import { openModal } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";
import ProfileDropdownModal from "@/components/header/organisms/ProfileDropdownModal";
import ChevronDown from "@/assets/icons/chevron_down.svg";

interface Props {
  profileImage?: string | null;
}

export default function ProfileDropdown({ profileImage }: Props) {
  return (
    <>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => openModal("profile-dropdown")}
      >
        <Avatar src={profileImage} />
        <Image src={ChevronDown} alt="▼" width={24} height={24} />
      </div>
      <ProfileDropdownModal profileImage={profileImage} />
    </>
  );
}
