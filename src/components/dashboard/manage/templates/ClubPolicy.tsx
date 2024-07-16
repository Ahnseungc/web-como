import { PrintButton } from "@/components/dashboard/common/DocUtil";
import { POLICY, POLICY_TITLE } from "@/lib/message/policy";

export default function ClubPolicyTab() {
  return (
    <div className="space-y-6 p-8 rounded-2xl bg-gray-0">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">{"동호회 상세 규정"}</h2>
        <PrintButton />
      </div>
      <p className="overflow-y-scroll h-[680px] body-1 font-medium text-gray-700 whitespace-pre-line">
        <span className="h3 font-bold">{POLICY_TITLE}</span>
        {POLICY}
      </p>
    </div>
  );
}
