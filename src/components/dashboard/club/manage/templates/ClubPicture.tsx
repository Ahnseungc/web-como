"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/action";
import type { ActivityPictureData } from "@/api/types/club/activity";
import ClubTitle from "@/components/dashboard/shared/molecules/ClubTitle";
import ClubPictureItem from "@/components/dashboard/shared/organisms/ClubPictureItem";

export default function ClubPictureTab() {
  const { data } = useQuery({
    queryKey: ["club-manage", "picture"],
    queryFn: () =>
      getData("v2/club/web/activity/", true).then(
        (res) => res.data as ActivityPictureData
      ),
  });

  return (
    <>
      <ClubTitle />
      {data &&
        [data].map((picture) => (
          <ClubPictureItem key={picture?.nickName} item={picture} />
        ))}
    </>
  );
}
