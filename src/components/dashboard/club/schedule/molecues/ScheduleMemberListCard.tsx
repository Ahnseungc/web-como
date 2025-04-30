"use client";

import Card from "@/components/dashboard/common/Card";
import TitleCard from "../atoms/TilteCard";
import ScheduleMemberListTable from "./ScheduleMemberListTable";
import Pagination from "@/components/dashboard/common/Pagination";

import { usePathname, useRouter } from "next/navigation";

interface ScheduleMemberListCardProps {
  type: "DETAIL" | "REGISTER";
  memberList?: any;
}
const ScheduleMemberListCard = ({
  type,
  memberList,
}: ScheduleMemberListCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const handlePageChange = (page: number) => {
    router.push(`${pathname}?page=${page}`);
  };
  return (
    <Card>
      <TitleCard title="참여 회원 명단" />
      {type === "DETAIL" && (
        <>
          <ScheduleMemberListTable
            schedules={memberList.List}
            currentPage={memberList.currentPage}
            itemsPerPage={10}
          />
          <Pagination
            currentPage={memberList.currentPage}
            handlePageChange={handlePageChange}
            maxPage={memberList.maxPage}
          />
        </>
      )}
      {type === "REGISTER" && (
        <div className="w-full flex justify-center items-center">
          <h2 className="font-suit text-brand-orange font-bold text-2xl pb-[32px]">
            등록 후 참여 명단을 조회할 수 있어요!
          </h2>
        </div>
      )}
    </Card>
  );
};

export default ScheduleMemberListCard;
