import { Calendar, Category, People } from "@/assets/icons/info";
import { formatDate } from "@/lib/utils";

const formatCreatedDate = (dateArray: number[]) => {
  if (!Array.isArray(dateArray) || dateArray.length < 6) {
    console.error("Invalid dateArray:", dateArray); // 오류 로그 추가
    return '';
  }

  const [year, month, day, hour, minute] = dateArray; // second는 기본값으로 처리
  const second = dateArray.length === 6 ? dateArray[5] : 0; // second가 없으면 0으로 설정

  // 각 값이 유효한지 확인
  if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute) || isNaN(second)) {
    console.error("Invalid date values:", { year, month, day, hour, minute, second });
    return '';
  }
  return formatDate(new Date(year, month - 1, day, hour, minute, second));
};

const categoryMapping = {
  "ART_CULTURE": "문화/예술",
  "ACTIVITY": "액티비티",
  "CREATIVE": "크리에이티브",
  "FOODBEVERAGE": "F&B",
  "NETWORKING": "네트워킹",
  "STUDY": "스터디",
  "ETC": "기타",
}

export default function ClubProfileInfo({ club }: { club: any }) {
  return (
    <div className="flex items-center gap-2 body-1 font-medium text-gray-500">
      <span>{"개설일자 " + formatCreatedDate(club.createdAt) || "2024.05.03"}</span>
      {/* <div className="flex items-center gap-0.5">
        <People className="w-5 h-5 text-gray-500" />
          {"23"}
      </div> */}
      {/* <div className="flex items-center gap-0.5">
        <Calendar className="w-[18px] h-[18px] text-gray-500" />
        {club.activityPlan || "주 1회"}
      </div> */}
    </div>
  );
}

export function ClubProfileCategoryInfo({ club }: { club: any }) {
  return (
    <div className="flex items-center gap-2 body-1 font-medium text-gray-500">
      <div className="flex items-center gap-0.5">
        <People className="w-4 h-4 text-gray-500" />
        {club.currentMember || "23"}
      </div>
      <div className="flex items-center gap-0.5">
        <Category className="w-4 h-4 text-gray-500" />
        {categoryMapping[club.category as keyof typeof categoryMapping] || "카테고리"}
      </div>
      <div className="flex items-center gap-0.5">
        <Calendar className="w-4 h-4 text-gray-500" />
        {club.activityPlan || "주 1회"}
      </div>
    </div>
  );
}
