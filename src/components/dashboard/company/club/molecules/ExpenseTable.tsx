"use client";
import { patchReject } from "@/api/actions/company/expense/patchReject";
import { pathApprove } from "@/api/actions/company/expense/pathApprove";
import {
  ExpenseApplicationEntry,
  ExpenseApplicationStatus,
} from "@/api/types/company/expense";
import ApprovalButton from "@/components/dashboard/shared/molecules/ApprovalButton";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const tableHeadings = {
  id: "순번",
  applicant: "신청자",
  department: "부서",
  clubName: "동호회명",
  eventName: "행사명",
  createdDate: "신청 일자",
  status: "상태",
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
  const [status, setStatus] = useState<ExpenseApplicationStatus[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      setStatus(
        expenseList.map((entry: ExpenseApplicationEntry) => entry.status)
      );
    };
    fetchData();
  }, [currentPage, startDate, endDate, expenseList]);

  const handleStatusChange = (id: number, status: "APPROVED" | "REJECTED") => {
    setStatus((prev) => {
      const newStatus = prev.map((s, idx) => {
        if (idx === id) {
          return status;
        }
        return s;
      });
      return newStatus;
    });
    if (status === "APPROVED") {
      pathApprove(id);
    } else if (status === "REJECTED") {
      patchReject(id);
    }
  };

  const getStatusComponent = (id: number, status: ExpenseApplicationStatus) => {
    switch (status) {
      case "REJECTED":
        return "반려";
      case "APPROVED":
        return "승인";
      case "PENDING":
        return (
          <div className="flex gap-2 justify-center">
            <ApprovalButton
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(id, "APPROVED");
              }}
              content="승인"
            />
            <ApprovalButton
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(id, "REJECTED");
              }}
              content="반려"
            />
          </div>
        );
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
        return "text-gray-800";
    }
  };
  const handleExpenseDetailClick = (id: number) => {
    router.push(`/company/dashboard/club/expense/${id}`);
  };

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        <div className="w-8 my-3 mx-6 body-1 font-bold text-gray-900 text-center">
          {tableHeadings.id}
        </div>
        <div className="flex-1 my-3 mx-6 body-1 font-bold max-w-[120px] text-center text-gray-900">
          {tableHeadings.applicant}
        </div>
        <div className="flex-1 my-3 mx-6 body-1 font-bold text-center max-w-[160px] text-gray-900">
          {tableHeadings.department}
        </div>
        <div className="flex-1 my-3 mx-6 body-1 font-bold text-center min-w-16 max-w-[220px] text-gray-900">
          {tableHeadings.clubName}
        </div>
        <div className="flex-1 my-3 mx-6 body-1 font-bold text-center min-w-16 max-w-[387px] text-gray-900">
          {tableHeadings.eventName}
        </div>
        <div className="flex-1 my-3 mx-6 body-1 font-bold text-center min-w-32 max-w-[180px] text-gray-900">
          {tableHeadings.createdDate}
        </div>
        <div className="flex-1 my-3 mx-6 body-1 font-bold text-center min-w-16 max-w-[389px] text-gray-900">
          {tableHeadings.status}
        </div>
      </li>
      {expenseList.map((entry, idx) => (
        <li
          key={entry.id}
          onClick={() => handleExpenseDetailClick(entry.id)}
          className="flex border-b border-gray-400 bg-gray-0 cursor-pointer hover:bg-gray-100"
        >
          <div className="w-8 my-3 mx-6 body-1 font-medium text-gray-800 text-center">
            {idx + 1}
          </div>
          <div className="flex-1 my-3 mx-6 body-1 font-medium max-w-[120px] text-center text-gray-800">
            {entry.applicantName}
          </div>
          <div className="flex-1 my-3 mx-6 body-1 font-medium text-center max-w-[160px] text-gray-800">
            {entry.department}
          </div>
          <div className="flex-1 my-3 mx-6 body-1 font-medium text-center min-w-16 max-w-[220px] text-gray-800">
            {entry.clubName}
          </div>
          <div className="flex-1 my-3 mx-6 body-1 font-medium text-center min-w-16 max-w-[387px] text-gray-800">
            {entry.eventName}
          </div>
          <div className="flex-1 my-3 mx-6 body-1 font-medium text-center min-w-32 max-w-[180px] text-gray-800">
            {formatDateFromArray(entry.createdDate)}
          </div>
          <div
            className={cn(
              "flex-1 my-3 mx-6 body-1 font-medium text-center min-w-16 max-w-[389px]",
              getStatusColor(status[idx])
            )}
          >
            {getStatusComponent(idx, status[idx])}
          </div>
        </li>
      ))}
    </ul>
  );
}
