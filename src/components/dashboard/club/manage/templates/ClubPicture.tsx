"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/action";
import type { ClubWebActivityInfoDTO } from "@/api/types/club/activity";
import ClubTitle from "@/components/dashboard/shared/molecules/ClubTitle";
import ClubPictureItem from "@/components/dashboard/shared/organisms/ClubPictureItem";
import { useEffect } from "react";
import { useState } from "react";

export default function ClubPictureTab({ clubId }: { clubId: string | null }) {
  const [pictures, setPictures] = useState<ClubWebActivityInfoDTO[]>([]);

  useEffect(() => {
    const fetchClubPictures = async () => {
      if (!clubId) return; // clubId가 없으면 호출하지 않음

      try {
        const response = await getData(`v1/executive/club/${clubId}/activity-feed`, true);
        setPictures(response.data); // pictures 상태 설정
      } catch (error) {
        console.error("클럽 사진을 가져오는 데 실패했습니다.", error);
      }
    };

    fetchClubPictures(); // API 호출
  }, [clubId]); // clubId가 변경될 때마다 호출

  console.log("ClubpictureTab 실행됨")
  console.log("ClubpictureTab 에서 clubId", clubId);
  console.log("ClubpictureTab 에서 pictures", pictures);

  return (
    <>
      {/* <ClubTitle /> */}
      {pictures.map((picture) => (
          <ClubPictureItem key={picture.id} item={picture} />
      ))}
    </>
  );
}
