"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/action";
import type { PolicyData } from "@/api/types/club/regulation";
import { POLICY, POLICY_TITLE } from "@/lib/message/policy";
import { PrintButton } from "@/components/dashboard/common/DocUtil";

export default function ClubPolicyTab() {
  const { data } = useQuery({
    queryKey: ["club-manage", "info"],
    queryFn: () =>
      getData("v2/club/web/regulation/", true).then(
        (res) => res.data as PolicyData
      ),
  });

  return (
    <div className="space-y-6 p-8 rounded-2xl bg-gray-0">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">{"동호회 상세 규정"}</h2>
        <PrintButton />
      </div>
      <p className="overflow-y-auto scrollbar-custom h-full max-h-[70dvh] body-1 font-medium text-gray-700">
        <div className="mb-4 h3 font-bold">{POLICY_TITLE}</div>
        {data && data.content}
        {/* {POLICY} */}
      </p>
    </div>
  );
}
