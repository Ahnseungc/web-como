"use client";

import Pagination from "@/components/dashboard/common/Pagination";
import { Plus } from "@/assets/icons/action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ScheduleListTable from "./ScheduleListTable";

export interface Schedule {
  id: number;
  title: string;
  createdDate: Array<number>;
}

interface ScheduleListProps {
  schedules: Schedule[];
  currentPage: number;
  maxPage: number;
  // isExist: boolean;
}

const ScheduleList = ({
  schedules,
  currentPage,
  maxPage,
  // isExist,
}: ScheduleListProps) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/club/dashboard/manage/schedule?page=${page}`);
  };

  useEffect(() => {
    router.replace(`/club/dashboard/manage/schedule?page=${currentPage}`);
  }, [currentPage, router]);

  useEffect(() => {
    if (sessionStorage.getItem("refresh-on-back") === "true") {
      sessionStorage.removeItem("refresh-on-back");

      router.refresh();
    }
  }, []);

  return (
    <div className="space-y-10 p-8 rounded-xl bg-gray-0">
      <div className="space-y-6">
        <div className="flex justify-between">
          <h3 className="h2 font-semibold text-gray-900">{"전체"}</h3>

          {/* {!isExist && ( */}
          <button
            className="flex items-center gap-[3px] py-1 px-3 rounded body-1 font-medium text-gray-50 bg-gray-900"
            onClick={() => router.push("schedule/register")}
          >
            {"동호회 일정 등록하기"}
            <Plus className="w-5 h-5" />
          </button>
          {/* )} */}
        </div>
        <ScheduleListTable
          schedules={schedules}
          currentPage={currentPage}
          itemsPerPage={10}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        maxPage={maxPage}
      />
    </div>
  );
};

export default ScheduleList;
