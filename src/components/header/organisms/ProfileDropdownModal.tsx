"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { closeModal, openModal } from "@/lib/utils";
import { deleteAllCookies } from "@/lib/cookies";
import Avatar from "@/components/common/Avatar";
import Backdrop from "@/components/common/Backdrop";
import { Close } from "@/assets/icons/action";
import { useEffect, useState } from "react";
import { getData } from "@/api/action";
interface Props {
  profileImage?: string | null;
} 

interface ProfileData {
  name?: string;
  profileImage?: string | null;
}

export default function ProfileDropdownModal({ profileImage }: Props) {
  const pathname = usePathname().split("/")[1];
  const { refresh } = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleLogout = async () => {
    await deleteAllCookies();
    refresh();
  };
  
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
    <div className="fixed modal hidden" id="profile-dropdown">
      <Backdrop invisible />
      <div className="fixed top-16 right-[30px] z-50 w-[390px] rounded-xl border border-gray-400">
        <div className="space-y-[28px] p-8 rounded-t-xl bg-gray-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
            <Avatar src={profileData?.profileImage || profileImage} />
            <span className="h3 font-semibold text-gray-900">
                {`${profileData?.name || "김오모"}님`}
                </span>
            </div>
            <div
              className="flex items-center justify-end w-8 h-8 cursor-pointer"
              onClick={() => closeModal()}
            >
              <Close className="w-6 h-6 text-gray-900" />
            </div>
          </div>
          <div>
            <div className="space-y-1 p-3 rounded-md bg-orange-50">
              <span className="body-2 font-medium text-gray-600">
                {"관리중인 동호회"}
              </span>
              <div className="h4 font-bold text-gray-900">
                {"으쌰으쌰 산악회"}
              </div>
            </div>
            <div
              className="w-full p-3 h4 font-medium text-gray-700 cursor-pointer"
              onClick={() => openModal("customer-center")}
            >
              {"고객센터"}
            </div>
            <Link href={`/${pathname}/support`} onClick={() => closeModal()}>
              <div className="w-full p-3 h4 font-medium text-gray-700">
                {"문의 및 기술지원"}
              </div>
            </Link>
          </div>
        </div>
        <div
          className="w-full py-3.5 rounded-b-xl text-center h3 font-semibold text-gray-0 bg-brand-orange cursor-pointer"
          onClick={handleLogout}
        >
          {"로그아웃"}
        </div>
      </div>
    </div>
  );
}
