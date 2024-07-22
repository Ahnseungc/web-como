"use client";

import { openModal } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";
import ProfileDropdownModal from "@/components/header/organisms/ProfileDropdownModal";
import { ChevronDown } from "@/assets/icons/chevron";

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
        <ChevronDown className="w-6 h-6 text-gray-500" />
      </div>
      <ProfileDropdownModal profileImage={profileImage} />
    </>
  );
}
