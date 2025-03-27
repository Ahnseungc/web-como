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
import { saveClubId, saveClubName, getClubId, getClubName } from "@/lib/cookies";

interface Props {
  profileImage?: string | null;
} 

interface ProfileData {
  name?: string;
  profileImage?: string | null;
}

interface ClubData {
  clubId: string;
  clubName: string;
}

export default function ProfileDropdownModal({ profileImage }: Props) {
  const pathname = usePathname().split("/")[1];
  const { refresh } = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [clubs, setClubs] = useState<ClubData[]>([]);
  const [currentClubId, setCurrentClubId] = useState<string>("");
  const [isClubDropdownOpen, setIsClubDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await deleteAllCookies();
    refresh();
  };
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedClubId = await getClubId();
        console.log('쿠키에서 가져온 clubId:', savedClubId);
        
        if (savedClubId) {
          setCurrentClubId(savedClubId);
        }
        
        // 프로필 데이터 가져오기
        const profileRes = await getData(`v1/executive/club/{clubId}/my-profile`, true);
        if (profileRes.resultCode === 'OK' && profileRes.data) {
          setProfileData(profileRes.data);
        }
  
        // 동호회 목록 가져오기
        const clubsRes = await getData('v1/executive/club/select', true);
        if (clubsRes.resultCode === 'OK' && clubsRes.data) {
          console.log('받아온 clubs:', clubsRes.data); // 디버깅용
          setClubs(clubsRes.data);
        }
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
      }
    };
    
    loadData();
  }, []);

  const handleClubChange = async (clubId: string, clubName: string) => {
    try {
      console.log('클릭한 동호회:', clubId, clubName); // 디버깅용 로그
      
      // 먼저 상태 업데이트
      setCurrentClubId(clubId);
      setIsClubDropdownOpen(false);
      
      // 쿠키 저장
      await saveClubId(clubId);
      await saveClubName(clubName);
      
      // 모달 닫고 페이지 새로고침
      closeModal();
      refresh();
    } catch (error) {
      console.error("동호회 전환 오류:", error);
    }
  };

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
          <div className="space-y-2">
            <div className="space-y-1 p-3 rounded-md bg-orange-50">
              <span className="body-2 font-medium text-gray-600">
                {"관리중인 동호회"}
              </span>
              <div 
                className="h4 font-bold text-gray-900 flex items-center justify-between cursor-pointer"
                onClick={() => setIsClubDropdownOpen(!isClubDropdownOpen)}
              >
                <span>
                  {(() => {
                    const foundClub = clubs.find(club => String(club.clubId) === String(currentClubId));
                    return foundClub?.clubName || "동호회 선택";
                  })()}
                </span>
                <svg 
                  className={`w-5 h-5 transition-transform ${isClubDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isClubDropdownOpen && (
                <div className="space-y-2">
                  {clubs
                    .filter(club => String(club.clubId) !== String(currentClubId))
                    .map((club) => (
                      <div
                        key={club.clubId}
                        onClick={() => handleClubChange(club.clubId, club.clubName)}
                        className="h4 font-medium text-gray-700 cursor-pointer hover:text-brand-orange"
                      >
                        {club.clubName}
                      </div>
                    ))}
                </div>
              )}
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
