"use client";

import { openModal } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";
import ProfileDropdownModal from "@/components/header/organisms/ProfileDropdownModal";
import { ChevronDown } from "@/assets/icons/chevron";
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "@/api/action";

interface Props {
  profileImage?: string | null;
}

interface ProfileData {
  name?: string;
  profileImage?: string | null;
}

export default function ProfileDropdown({ profileImage }: Props) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // useEffect 안에 API 호출 코드 추가
  useEffect(() => {
    // API 호출 함수
    const loadProfileData = async () => {
      try {
        // API 호출
        const res = await getData(`v1/executive/club/{clubId}/my-profile`, true);
        
        // 응답 처리
        if (res.resultCode === 'OK' && res.data) {
          setProfileData(res.data);
        } else {
          console.error("API 오류:", res.resultMessage);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };
    
    // API 함수 호출
    loadProfileData();
    
    // 컴포넌트 언마운트 시 실행될 클린업 함수
    return () => {
      // console.log("ProfileDropdownModal 언마운트됨");
    };
    
  }, []); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행

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
