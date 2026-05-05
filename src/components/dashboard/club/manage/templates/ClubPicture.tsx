"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";
import type { ClubWebActivityInfoDTO } from "@/api/types/club/activity";
import ClubPictureItem from "@/components/dashboard/shared/organisms/ClubPictureItem";

export default function ClubPictureTab({ clubId }: { clubId: string | null }) {
  const { data: pictures = [] } = useQuery<ClubWebActivityInfoDTO[]>({
    queryKey: ["club", clubId, "activity-feed"],
    queryFn: () =>
      getData(`v1/executive/club/${clubId}/activity-feed`, true).then(
        (res) => res.data ?? []
      ),
    enabled: !!clubId,
  });

  if (pictures.length === 0) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-500">
        등록된 활동사진이 없습니다. 많은 회원이 볼 수 있게 어플에서 업로드 해
        보세요!
      </div>
    );
  }

  return (
    <>
      {pictures.map((picture) => (
        <ClubPictureItem key={picture.id} item={picture} />
      ))}
    </>
  );
}
