"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";
import type { PolicyData } from "@/api/types/club/regulation";
import { PrintButton } from "@/components/dashboard/common/DocUtil";

export default function ClubPolicyTab({ clubId }: { clubId: string | null }) {
  const { data } = useQuery({
    queryKey: ["club-manage", "policy"],
    queryFn: () =>
      getData(`v1/executive/club/${clubId}/policy`, true).then(
        (res) => res.data as PolicyData
      ),
  });

  return (
    <div className="space-y-6 p-8 rounded-2xl bg-gray-0">
      <div className="flex items-center justify-end">
        <PrintButton />
      </div>
      {typeof data === "string" && (
        <img
          src={data}
          alt="동호회 회칙 이미지"
          className="mt-4"
          width={24}
          height={24}
        />
      )}
    </div>
  );
}
