"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

  const alertShownRef = useRef(false);

  const getClubOptions = useCallback(async () => {
    const token = await getAccessToken();

    try {
      const response = await fetch(`/api/v1/club/my`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 400 && !alertShownRef.current) {
        alertShownRef.current = true;
        alert("인증이 필요한 서비스입니다. 다시 로그인해 주세요.");
        window.location.replace(LOGIN_ENDPOINT);
        return;
      }

      if (!response.ok) {
        // 에러 처리 로직
        return;
      }

      const res: IResponse = await response.json();
      setClubOptions(res.data);
    } catch (error) {
      console.error("관리 중인 동호회 목록 조회 에러:", error);
    }
  }, []);

  useEffect(() => {
    getClubOptions();
  }, [getClubOptions]);

  // selectedClub 상태가 변경될 때마다 로그 출력
  // useEffect(() => {
  //   if (selectedClub) {
  //     console.log('클럽 선택됨:', {
  //       clubId: selectedClub.clubId,
  //       clubName: selectedClub.clubName
  //     });
  //   }
  // }, [selectedClub]);

  if (!clubOptions) {
    // 초기 로딩 상태
    return null;
  }

  // 빈 리스트일 때 메시지 표시
  if (clubOptions.length === 0) {
    return (
      <div className="space-y-9 min-w-[600px] p-8 rounded-xl bg-gray-0 shadow">
        <div className="flex flex-col items-center py-8">
          <h2 className="h2 font-bold text-gray-900">
            관리 중인 동호회가 없습니다
          </h2>
          <span className="h4 text-gray-600 mt-4">
            고객센터에 문의해 주시기 바랍니다
          </span>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!selectedClub) {
      return;
    }

    await saveClubId(selectedClub.id.toString());
    // console.log('클럽 ID 저장 완료:', selectedClub.id.toString());

    await saveClubName(selectedClub.name);
    // console.log('클럽 이름 저장 완료:', selectedClub.name);

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
              key={option.id}
              content={option.name}
              onClick={() => setSelectedClub(option)}
              orange={option.id === selectedClub?.id}
              className={cn(
                "justify-start px-3",
                option.id === selectedClub?.id
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
