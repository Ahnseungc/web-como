"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getClubId, getData } from "@/lib/client-utils";
import ScheduleList from "@/components/dashboard/club/schedule/molecues/ScheduleList";
import ScheduleTitle from "@/components/dashboard/club/schedule/molecues/ScheduleTitle";

export default function ManageSchedulePage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [schedulesList, setSchedulesList] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const clubId = await getClubId();
        const response = await getData(
          `v1/executive/club/${clubId}/schedule/existence?page=${page}`,
          true
        );

        setSchedulesList(response.data);
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
        setSchedulesList(false);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  if (loading) return null;

  return (
    <div className="space-y-6">
      <ScheduleTitle />
      {schedulesList === false ||
      !schedulesList?.List ||
      schedulesList.List.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-lg font-medium text-center">
            등록된 일정이 없습니다.
            <br />
            새로운 일정을 등록하여 동호회 활동을 시작해보세요!
          </p>
        </div>
      ) : (
        <ScheduleList
          schedules={schedulesList.List}
          currentPage={schedulesList.currentPage}
          maxPage={schedulesList.maxPage}
        />
      )}
    </div>
  );
}
