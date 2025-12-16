"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ClubProfileInfo from "@/components/dashboard/club/common/ClubProfileInfo";
import { getData, getClubId } from "@/lib/client-utils";

interface Props {
  padding?: string;
}

export default function ClubInfoCard({ padding }: Props) {
  const clubId = getClubId();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getData(
          `v1/executive/club/${clubId}/card`,
          false
        );
        setData(response.data);
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
      }
    };

    if (clubId) {
      loadData();
    }
  }, [clubId]);

  if (!data) return null;

  return (
    <div
      className={cn("h-fit rounded-xl bg-gray-0", padding ? padding : "p-5")}
    >
      <div className="relative w-[350px] h-[350px] mb-6 rounded-lg object-cover bg-gray-300">
        <Image
          src={data.clubImage}
          alt="동호회 이미지"
          fill
          sizes="30vw"
          priority
          className="rounded-lg"
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-end gap-2 ">
          <h3 className="h2 font-bold text-gray-900 max-w-[300px] truncate ">
            {data.clubName}
          </h3>
        </div>

        <div className="body-1 font-medium text-gray-500">
          <ClubProfileInfo
            createdAt={data.createdAt}
            memberCount={data.memberCount}
            activityPlan={data.activityPlan}
          />
          <span>{`회장_${data.headName}  ${data.deputyName === "" ? "" : ` / 부회장_${data.deputyName}`} ${data.affairsName === "" ? "" : ` / 총무_${data.affairsName}`} `}</span>
        </div>
      </div>
    </div>
  );
}
