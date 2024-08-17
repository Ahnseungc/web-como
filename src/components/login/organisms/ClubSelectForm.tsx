"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { IResponse } from "@/api/types";
import type { LoginClubData, LoginClubDTO } from "@/api/types/member/login";
import { getAccessToken, saveClubId } from "@/lib/cookies";
import { cn } from "@/lib/utils";
import Button from "@/components/common/Button";

export default function ClubSelectForm() {
  const { refresh } = useRouter();
  const [clubOptions, setClubOptions] = useState<LoginClubDTO[]>();
  const [selectedClub, setSelectedClub] = useState<number>();

  useEffect(() => {
    const getClubOptions = async () => {
      const token = await getAccessToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/v2/member/web/login`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const res: IResponse = await response.json();
      const data: LoginClubData = res.data;

      setClubOptions(data.loginClubDTOS);
      setSelectedClub(data.loginClubDTOS[0].clubId);
    };

    getClubOptions();
  }, []);

  const handleSubmit = async () => {
    if (!selectedClub) {
      return;
    }

    await saveClubId(selectedClub.toString());
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
              onClick={() => setSelectedClub(option.clubId)}
              orange={option.clubId === selectedClub}
              className={cn(
                "justify-start px-3",
                option.clubId === selectedClub
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
