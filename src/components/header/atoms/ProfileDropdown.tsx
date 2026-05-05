"use client";

import { openModal } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";
import ProfileDropdownModal from "@/components/header/organisms/ProfileDropdownModal";
import { ChevronDown } from "@/assets/icons/chevron";
import { useQuery } from "@tanstack/react-query";
import { getData, getRole } from "@/lib/client-utils";

interface Props {
  profileImage?: string | null;
}

interface ProfileData {
  name?: string;
  profileImage?: string | null;
}

export default function ProfileDropdown({ profileImage }: Props) {
  const role = getRole();

  const { data: profileData } = useQuery<ProfileData>({
    queryKey: ["profile", role],
    queryFn: () =>
      getData("v1/manager/member/my-profile", true).then((res) => res.data),
    enabled: role === "club" || role === "company",
  });

  return (
    <>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => openModal("profile-dropdown")}
      >
        <Avatar src={profileData?.profileImage || profileImage} />
        <ChevronDown className="w-6 h-6 text-gray-500" />
      </div>
      <ProfileDropdownModal profileImage={profileImage} />
    </>
  );
}
