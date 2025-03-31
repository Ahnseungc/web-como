"use client";

import { openModal } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";
import ProfileDropdownModal from "@/components/header/organisms/ProfileDropdownModal";
import { ChevronDown } from "@/assets/icons/chevron";
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "@/api/action";
import { getRole } from "@/lib/cookies";

interface Props {
  profileImage?: string | null;
}

interface ProfileData {
  name?: string;
  profileImage?: string | null;
}

export default function ProfileDropdown({ profileImage }: Props) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const role = await getRole();

        let res;
        if (role === "club") {
          res = await getData(`v1/executive/club/{clubId}/my-profile`, true);
        } else if (role === "company") {
          res = await getData(`v1/manager/member/my-profile`, true);
        }
        
        if (res?.resultCode === 'OK' && res.data) {
          setProfileData(res.data);
        } else {
          console.error("API 오류:", res?.resultMessage);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    loadProfileData();
  }, []);

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
