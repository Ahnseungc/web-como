"use client";

import { PageType } from "@/app/club/dashboard/manage/schedule/[id]/page";
import { Remove, Plus } from "@/assets/icons/action";
import { getAccessToken, getClubId } from "@/lib/cookies";
import { usePathname, useRouter } from "next/navigation";

export enum ScheduleDetailCardType {
  REGISTER = "일정 등록",
  DETAIL = "일정 상세 정보",
  EDIT = "일정 수정",
  MEMBERS = "회원 관리",
}

const TitleCard = ({
  type,
  scheduleId,
}: {
  type: PageType;
  scheduleId?: number;
}) => {
  const title = ScheduleDetailCardType[type];
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm("정말로 이 일정을 삭제하시겠습니까?")) {
      const token = await getAccessToken();
      const clubId = await getClubId();
      const response = await fetch(
        `/api/server/v1/executive/club/${clubId}/schedule/${scheduleId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("일정이 삭제되었습니다.");
        router.push("/club/dashboard/manage/schedule");
        router.refresh();
      } else {
        alert("일정 삭제에 실패했습니다.");
      }
    }
  };

  const handleEdit = () => {
    router.push(`/club/dashboard/manage/schedule/${scheduleId}/edit`);
  };

  return (
    <header className="flex items-center justify-between">
      <h2 className="h1 font-bold text-black">{title}</h2>

      {title === ScheduleDetailCardType.DETAIL && (
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-[3px] py-1 px-3 rounded body-1 font-medium text-gray-50 bg-gray-900"
            onClick={handleEdit}
          >
            {"수정"}
          </button>
          <button
            className="flex items-center gap-[3px] py-1 px-3 rounded body-1 font-medium text-gray-50 bg-gray-900"
            onClick={handleDelete}
          >
            {"삭제"}
          </button>
        </div>
      )}
    </header>
  );
};

export default TitleCard;
