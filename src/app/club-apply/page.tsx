"use client";

import { useState } from "react";
import BackButton from "@/components/dashboard/common/BackButton";
import ApplyHeader from "@/components/club-apply/molecules/ApplyHeader";
import StepTabs from "@/components/club-apply/molecules/StepTabs";
import ClubApplyForm from "@/components/club-apply/organisms/ClubApplyForm";

export default function ClubApplyPage() {
  const [activeTabId, setActiveTabId] = useState("club-info");

  return (
    <main className="min-h-screen bg-gray-200 py-12 px-4">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>
        {/* 상단 헤더 카드 */}
        <ApplyHeader />
        {/* 메인 신청서 카드 */}
        <div className="bg-gray-0 rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
          <StepTabs activeTabId={activeTabId} onTabChange={setActiveTabId} />

          <div className="p-10">
            <ClubApplyForm activeTabId={activeTabId} />
          </div>
        </div>
      </div>
    </main>
  );
}
