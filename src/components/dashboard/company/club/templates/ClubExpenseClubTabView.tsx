"use client";

import { useRouter } from "next/navigation";
import DropdownSearch from "@/components/common/DropdownSearch";

export default function ClubExpenseClubTabView() {
  const { push } = useRouter();

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h2 className="font-semibold text-gray-900">{"동호회 검색"}</h2>
      <DropdownSearch
        baseStyle="max-w-[500px]"
        handleSelect={(selected) => push(`./expense/club/${selected}/expense`)}
      />
    </div>
  );
}
