"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { IResponse } from "@/api/types";
import type { LoginClubData, LoginClubDTO } from "@/api/types/member/login";
import { getAccessToken, saveClubId, saveClubName } from "@/lib/cookies";
import { cn } from "@/lib/utils";
import Button from "@/components/common/Button";
import { LOGIN_ENDPOINT, CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";

export default function ClubSelectForm() {
  // const { refresh } = useRouter();
  const router = useRouter();

  const [clubOptions, setClubOptions] = useState<LoginClubDTO[]>();
  const [selectedClub, setSelectedClub] = useState<LoginClubDTO>();
  
  const getClubOptions = async () => {
    const token = await getAccessToken();

    try {
      const response = await fetch(`/api/server/v1/executive/club/select`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      // API 응답 확인을 위한 콘솔 로그
      console.log("API 응답 상태:", response.status);

      // 401 인증 에러 처리
      if (response.status === 401) {
        // sessionStorage에 체크값을 저장하여 중복 alert 방지
        if (!sessionStorage.getItem('auth_alert')) {
          sessionStorage.setItem('auth_alert', 'true');
          alert('인증이 필요한 서비스입니다. 다시 로그인해 주세요.');
          window.location.href = LOGIN_ENDPOINT;
        }
        return;
      }

      // 다른 에러 처리
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API 응답 에러:', errorData);
        return;
      }

      // 정상 응답 처리
      const res: IResponse = await response.json();
      const clubList = res.data;
      console.log('클럽 목록 데이터:', clubList);

      // 클럽 목록 설정
      setClubOptions(clubList);
      // setSelectedClub(clubList[0]);
    } catch (error) {
      console.error('담당 동호회 목록 조회 에러:', error);
    }
  };

  useEffect(() => {
    getClubOptions();
  }, []);

  // selectedClub 상태가 변경될 때마다 로그 출력
  useEffect(() => {
    if (selectedClub) {
      console.log('클럽 선택됨:', {
        clubId: selectedClub.clubId,
        clubName: selectedClub.clubName
      });
    }
  }, [selectedClub]);

  // 인증 에러 시 렌더링하지 않음
  if (!clubOptions?.length) {  // optional chaining 추가
    return null;
  }

  const handleSubmit = async () => {
    if (!selectedClub) {
      return;
    }

    await saveClubId(selectedClub.clubId.toString());
    console.log('클럽 ID 저장 완료:', selectedClub.clubId.toString());

    await saveClubName(selectedClub.clubName);
    console.log('클럽 이름 저장 완료:', selectedClub.clubName);

    // 🚀 100ms 지연 후 refresh() 실행하여 쿠키 반영 대기
    setTimeout(() => {
      router.push(CLUB_DASHBOARD_ENDPOINT);
    }, 100);
  };

  return (
    <div className="space-y-9 min-w-[600px] p-8 rounded-xl bg-gray-0 shadow">
      <h2 className="text-center h1 font-bold text-gray-900">
        {"어떤 동호회를 관리하시겠어요?"}
      </h2>
      <div className="space-y-4">
        {clubOptions &&
          clubOptions.map((option) => (
            <Button
              key={option.clubId}
              content={option.clubName}
              onClick={() => setSelectedClub(option)}
              orange={option.clubId === selectedClub?.clubId}
              className={cn(
                "justify-start px-3",
                option.clubId === selectedClub?.clubId
                  ? ""
                  : "border-gray-100 bg-gray-100"
              )}
            />
          ))}
      </div>
      <Button
        primary
        content="확인"
        disabled={!selectedClub}
        onClick={handleSubmit}
      />
    </div>
  );
}
