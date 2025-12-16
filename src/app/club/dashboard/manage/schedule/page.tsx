"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getData } from "@/lib/client-utils";
import ScheduleList from "@/components/dashboard/club/schedule/molecues/ScheduleList";
import ScheduleTitle from "@/components/dashboard/club/schedule/molecues/ScheduleTitle";

export default function ManageSchedulePage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [schedulesList, setSchedulesList] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getData(
          `v1/executive/club/{clubId}/schedules?page=${page}`,
          true
        );
        setSchedulesList(response.data);
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
      }
    };

    loadData();
  }, [page]);

  if (!schedulesList) return null;

  return (
    <>
      <ScheduleTitle />
      <ScheduleList
        schedules={schedulesList.List}
        currentPage={schedulesList.currentPage}
        maxPage={schedulesList.maxPage}
      />
    </>
  );
}
