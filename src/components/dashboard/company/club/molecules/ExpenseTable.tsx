"use client";
import {
  ExpenseApplicationEntry,
  ExpenseApplicationStatus,
} from "@/api/types/company/expense";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RejectReasonModal from "../modals/RejectReasonModal";
import { getRejectionReason } from "@/api/actions/company/expense/getRejectionReason";

const tableHeadings = {
  id: "순번",
  clubName: "동호회명",
  eventName: "행사명",
  applicant: "신청자",
  department: "부서",
  createdDate: "신청 일자",
  status: "상태",
  rejectReason: "반려사유",
};

const formatDateFromArray = (dateArray: number[]) => {
  const [year, month, day] = dateArray;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

export default function ExpenseTable({
  expenseList,
  currentPage,
  startDate,
  endDate,
}: {
  currentPage: number;
  startDate: string;
  endDate: string;
  expenseList: ExpenseApplicationEntry[];
}) {
  const [status, setStatus] = useState<Map<number, ExpenseApplicationStatus>>(
    new Map()
  );
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalReason, setModalReason] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const statusMap = new Map();
      expenseList.forEach((entry) => {
        statusMap.set(entry.id, entry.status);
      });
      setStatus(statusMap);
    };
    fetchData();
  }, [currentPage, startDate, endDate, expenseList]);

  // const handleStatusChange = (
  //   id: number,
  //   newStatus: "APPROVED" | "REJECTED"
  // ) => {
  //   setStatus((prev) => {
  //     const newMap = new Map(prev);
  //     newMap.set(id, newStatus);
  //     return newMap;
  //   });

  //   if (newStatus === "APPROVED") {
  //     pathApprove(id);
  //   } else if (newStatus === "REJECTED") {
  //     patchReject(id);
  //   }
  // };

  const getStatusComponent = (
    id: number,
    currentStatus: ExpenseApplicationStatus
  ) => {
    switch (currentStatus) {
      case "REJECTED":
        return "반려";
      case "APPROVED":
        return "승인";
      case "PENDING":
        return "대기";
      // return (
      //   <div className="flex gap-2 justify-center">
      //     <ApprovalButton
      //       onClick={(e) => {
      //         e.stopPropagation();
      //         handleStatusChange(id, "APPROVED");
      //       }}
      //       content="승인"
      //     />
      //     <ApprovalButton
      //       onClick={(e) => {
      //         e.stopPropagation();
      //         handleStatusChange(id, "REJECTED");
      //       }}
      //       content="반려"
      //     />
      //   </div>
      // );
      default:
        return "";
    }
  };

  const getStatusColor = (status: ExpenseApplicationStatus) => {
    switch (status) {
      case "REJECTED":
        return "text-point-red";
      case "APPROVED":
        return "text-point-blue";
      default:
        return "text-gray-500";
    }
  };

  const handleExpenseDetailClick = (id: number, clubName: string) => {
    router.push(`/company/dashboard/club/expense/${id}?clubName=${clubName}`);
  };

  // 상세보기 클릭 핸들러
  const handleRejectDetailClick = async (id: number) => {
    const data = await getRejectionReason(id.toString());
    const rejectionReason = data.rejectionReason;
    setModalReason(rejectionReason ?? "기타");
    setModalOpen(true);
  };

  return (
    <>
      <ul className="flex flex-col gap-1 w-full">
        <li className="flex w-full border-y border-gray-400 bg-gray-200">
          <div className="flex-[76] my-3 body-1 font-bold text-gray-900 text-center">
            {tableHeadings.id}
          </div>
          <div className="flex-[220] my-3 body-1 font-bold text-center text-gray-900">
            {tableHeadings.clubName}
          </div>
          <div className="flex-[516] my-3 body-1 font-bold text-center text-gray-900">
            {tableHeadings.eventName}
          </div>
          <div className="flex-[100] my-3 body-1 font-bold text-center text-gray-900">
            {tableHeadings.applicant}
          </div>
          <div className="flex-[220] my-3 body-1 font-bold text-center text-gray-900">
            {tableHeadings.department}
          </div>
          <div className="flex-[160] my-3 body-1 font-bold text-center text-gray-900">
            {tableHeadings.createdDate}
          </div>
          <div className="flex-[120] my-3 body-1 font-bold text-center text-gray-900">
            {tableHeadings.status}
          </div>
          <div className="flex-[120] my-3 body-1 font-bold text-center text-gray-900">
            {tableHeadings.rejectReason}
          </div>
        </li>
        {expenseList.map((entry, idx) => (
          <li
            key={entry.id}
            onClick={() => handleExpenseDetailClick(entry.id, entry.clubName)}
            className="flex w-full border-b border-gray-400 bg-gray-0 cursor-pointer hover:bg-gray-100"
          >
            <div className="flex-[76] my-3 body-1 font-medium text-gray-800 text-center">
              {idx + 1}
            </div>
            <div className="flex-[220] my-3 body-1 font-medium text-center text-gray-800">
              {entry.clubName}
            </div>
            <div className="flex-[516] my-3 body-1 font-medium text-center text-gray-800">
              {entry.eventName}
            </div>
            <div className="flex-[100] my-3 body-1 font-medium text-center text-gray-800">
              {entry.applicantName}
            </div>
            <div className="flex-[220] my-3 body-1 font-medium text-center text-gray-800">
              {entry.department}
            </div>
            <div className="flex-[160] my-3 body-1 font-medium text-center text-gray-800">
              {formatDateFromArray(entry.createdDate)}
            </div>
            <div
              className={cn(
                "flex-[120] my-3 body-1 font-medium text-center",
                getStatusColor(status.get(entry.id) || entry.status)
              )}
            >
              {getStatusComponent(
                entry.id,
                status.get(entry.id) || entry.status
              )}
            </div>
            <div className="flex-[120] my-3 body-1 font-medium text-center text-gray-800">
              {entry.status === "REJECTED" ? (
                <button
                  type="button"
                  className="text-gray-800 underline decoration-gray-800 underline-offset-2 hover:opacity-80 transition px-2 py-0.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRejectDetailClick(entry.id);
                  }}
                >
                  상세보기
                </button>
              ) : (
                "-"
              )}
            </div>
          </li>
        ))}
      </ul>
      <RejectReasonModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        reason={modalReason}
      />
    </>
  );
}
