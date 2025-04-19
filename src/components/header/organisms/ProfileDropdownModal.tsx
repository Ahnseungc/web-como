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
import { saveClubId, saveClubName, getClubId, getClubName, getRole, saveCompanyName } from "@/lib/cookies";
import { LOGIN_ENDPOINT } from "@/lib/constants";

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

interface CompanyData {
  companyName: string;
}

export default function ProfileDropdownModal({ profileImage }: Props) {
  const pathname = usePathname().split("/")[1];
  const { refresh } = useRouter();
  const [userRole, setUserRole] = useState<string>("");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [clubs, setClubs] = useState<ClubData[]>([]);
  const [currentClubId, setCurrentClubId] = useState<string>("");
  const [isClubDropdownOpen, setIsClubDropdownOpen] = useState(false);


  const handleLogout = async () => {
    await deleteAllCookies();
    refresh();
    window.location.replace(LOGIN_ENDPOINT); // 로그인 페이지로 이동
  };
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const role = await getRole();  // role 가져오기
        const savedClubId = await getClubId();
        // console.log("role:", role);

        if (role) {  // role이 존재할 때만 상태 업데이트
          setUserRole(role);
        }
        
        if (savedClubId) {
          setCurrentClubId(savedClubId);
        }

        if (role === "club") {
          // 동호회 관리자용 API
          const profileRes = await getData(`v1/executive/club/{clubId}/my-profile`, true);
          if (profileRes.resultCode === 'OK' && profileRes.data) {
            setProfileData(profileRes.data);
          }

          const clubsRes = await getData('v1/executive/club/select', true);
          if (clubsRes.resultCode === 'OK' && clubsRes.data) {
            setClubs(clubsRes.data);
          }
        } else if (role === "company") {
          // 기업 관리자용 API
          const profileRes = await getData(`v1/manager/member/my-profile`, true);
          if (profileRes.resultCode === 'OK' && profileRes.data) {
            setProfileData(profileRes.data);
            // 회사 이름 저장
            const companyName = profileRes.data.departmentName || profileRes.data.companyName;
            if (companyName) {
              await saveCompanyName(companyName);
              setCompanyData({
                companyName: companyName
              });
            }
          }
          // console.log('회사 정보:', profileRes.data);
        }
        
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
      }
    };
    
    loadData();
  }, []);

  const handleClubChange = async (clubId: string, clubName: string) => {
    try {
      // console.log('클릭한 동호회:', clubId, clubName); // 디버깅용 로그
      
      // 먼저 상태 업데이트
      setCurrentClubId(clubId);
      setIsClubDropdownOpen(false);
      
      // 쿠키 저장
      await saveClubId(clubId);
      await saveClubName(clubName);
      
      // 모달 닫고 페이지 새로고침
      closeModal();
      // refresh();
      window.location.reload();
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
            {userRole === "club" && (
            <div className="space-y-1 p-3 rounded-md bg-orange-50">
              <span className="body-2 font-medium text-gray-600">
                {"관리중인 동호회"}
              </span>
              <div className="relative">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => clubs.length > 1 && setIsClubDropdownOpen(!isClubDropdownOpen)}
                >
                  <span className="h4 font-bold text-gray-900">
                    {clubs.find(club => String(club.clubId) === String(currentClubId))?.clubName}
                  </span>
                  {clubs.length > 1 && (
                    <svg 
                      className={`w-5 h-5 transition-transform ${isClubDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
                {isClubDropdownOpen && clubs.length > 1 && (
                  <div className="absolute left-0 right-0 mt-2 bg-gray-0 rounded-md shadow-md z-50 border border-gray-200">
                    {clubs
                      .filter(club => String(club.clubId) !== String(currentClubId))
                      .map((club) => (
                        <div
                          key={club.clubId}
                          onClick={() => handleClubChange(club.clubId, club.clubName)}
                          className="p-3 h4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                        >
                          {club.clubName}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            )}
            {userRole === "company" && (
              <div className="space-y-1 p-3 rounded-md bg-orange-50">
                <span className="body-2 font-medium text-gray-600">
                  {"주무부서"}
                </span>
                <div className="flex items-center justify-between">
                  <span className="h4 font-bold text-gray-900">
                    {companyData?.companyName}
                  </span>
                </div>
              </div>
            )}
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
