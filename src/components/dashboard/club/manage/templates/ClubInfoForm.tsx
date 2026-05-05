"use client";

import { useQuery } from "@tanstack/react-query";
import { ClubIndexSchemaType } from "@/lib/types/schema";
import ClubIndexImageSection from "../organisms/ClubIndexImageSection";
import ClubIndexInfoSection from "../organisms/ClubIndexInfoSection";
import { getData } from "@/lib/client-utils";
import { ClubIndexData } from "@/api/types/club";

export default function ClubInfoForm({ clubId }: { clubId: string | null }) {
  const { data: clubInfo } = useQuery<ClubIndexData>({
    queryKey: ["club", clubId],
    queryFn: () =>
      getData(`v1/club/${clubId}`, true).then((res) => res.data),
    enabled: !!clubId,
  });

  return (
    <form className="flex gap-3">
      <ClubIndexImageSection<ClubIndexSchemaType>
        name="clubImage"
        clubImage={clubInfo?.clubImage as string}
      />
      <ClubIndexInfoSection clubId={clubId} />
    </form>
  );
}
