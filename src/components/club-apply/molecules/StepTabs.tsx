"use client";

// 탭 데이터 정의
const TABS = [
  { id: "club-info", label: "동호회 정보" },
  { id: "activity-info", label: "활동 정보" },
  { id: "membership-fee", label: "회비 정보" },
  { id: "operation-info", label: "운영 정보" },
  { id: "terms", label: "이용약관" },
];

interface StepTabsProps {
  activeTabId: string;
  onTabChange: (tabId: string) => void;
}

export default function StepTabs({ activeTabId, onTabChange }: StepTabsProps) {
  return (
    <div className="w-full">
      <h2 className="text-[18px] font-bold text-gray-800 mb-6 px-8 pt-8">
        신규 사내동호회 개설 신청서 작성
      </h2>

      <div className="flex border-b border-gray-100">
        {TABS.map((tab) => {
          const isActive = activeTabId === tab.id;

          return (
            <div
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center py-5 cursor-pointer relative transition-all ${
                isActive ? "text-gray-900" : "text-gray-300"
              }`}
            >
              <span
                className={`text-[20px] font-bold ${
                  isActive ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>

              {isActive ? (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FF6B00]" />
              ) : (
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-100" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
