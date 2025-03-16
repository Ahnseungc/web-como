"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { IResponse } from "@/api/types";
import type { LoginClubData, LoginClubDTO } from "@/api/types/member/login";
import { getAccessToken, saveClubId, saveClubName } from "@/lib/cookies";
import { cn } from "@/lib/utils";
import Button from "@/components/common/Button";
import { LOGIN_ENDPOINT } from "@/lib/constants";

export default function ClubSelectForm() {
  const { refresh } = useRouter();
  const [clubOptions, setClubOptions] = useState<LoginClubDTO[]>();
  const [selectedClub, setSelectedClub] = useState<LoginClubDTO>();
  
  const getClubOptions = async () => {
    const token = await getAccessToken();

    try {
      const response = await fetch(`/api/server/v1/executive/clubs/select`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

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
      const data: LoginClubData = res.data;
      setClubOptions(data.loginClubDTOS);
      setSelectedClub(data.loginClubDTOS[0]);
    } catch (error) {
      console.error('담당 동호회 목록 조회 에러:', error);
    }
  };

  useEffect(() => {
    getClubOptions();
  }, []);


  // 인증 에러 시 렌더링하지 않음
  if (!clubOptions?.length) {  // optional chaining 추가
    return null;
  }

  const handleSubmit = async () => {
    if (!selectedClub) {
      return;
    }

    await saveClubId(selectedClub.clubId.toString());
    await saveClubName(selectedClub.clubName);
    refresh();
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
