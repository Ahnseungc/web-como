"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Pin } from "@/assets/icons/info";
import { Notice } from "@/api/types/notice";
import {
  deleteNotice,
  getNoticeDetail,
  getNotices,
  pinNotice,
  unpinNotice,
} from "@/api/actions/club/notice";
import { useToast } from "@/components/common/ToastContainer";

const tableHeadings = [
  "순번",
  "제목",
  "작성자",
  "작성일자",
  "조회수",
  "게시 상태",
];

function AnnouncementTable({ currentPage }: { currentPage: number }) {
  const pathname = usePathname();
  const { push } = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const itemsPerPage = 10; // 페이지당 항목 수

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchNotices = async () => {
      const result = await getNotices(currentPage, "");
      console.log("fetchNotices result", result);
      const { noticeList, currentPage: cur, maxPage } = result.data;
      setNotices(noticeList);
      setIsLoading(false);
    };
    fetchNotices();
  }, []);

  const formatDate = (dateArray: number[]) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  // 최대 2개까지 고정 가능하도록 pin/unpin 구현
  const handlePin = async (noticeId: number) => {
    try {
      const pinnedCount = notices.filter((n) => n.isPinned === "Y").length;
      if (pinnedCount >= 2) {
        showToast("공지사항 상단 고정은 2개까지 가능합니다.", "error");
        return;
      }

      const response = await pinNotice(noticeId.toString());
      if (response.resultCode === "OK") {
        setNotices((prev) =>
          prev.map((n) =>
            n.noticeId === noticeId ? { ...n, isPinned: "Y" } : n
          )
        );
        showToast("공지사항이 고정되었습니다.", "success");
      } else {
        showToast("공지사항 고정에 실패했습니다.", "error");
      }
    } catch (error) {
      console.error("공지사항 고정 실패:", error);
      showToast("공지사항 고정에 실패했습니다.", "error");
    }
  };

  const handleUnpin = async (noticeId: number) => {
    try {
      const response = await unpinNotice(noticeId.toString());
      if (response.resultCode === "OK") {
        setNotices((prev) =>
          prev.map((n) =>
            n.noticeId === noticeId ? { ...n, isPinned: "N" } : n
          )
        );
        showToast("공지사항 고정이 해제되었습니다.", "success");
      } else {
        showToast("공지사항 고정 해제에 실패했습니다.", "error");
      }
    } catch (error) {
      console.error("공지사항 고정 해제 실패:", error);
      showToast("공지사항 고정 해제에 실패했습니다.", "error");
    }
  };

  const handleTitleClick = async (noticeId: number) => {
    try {
      // 상세 페이지에서 직접 API 호출하도록 수정
      // 조회수 증가는 상세 페이지에서만 발생하도록 함
      push(`${pathname}/${noticeId}`);
    } catch (error) {
      showToast("페이지 이동에 실패했습니다.", "error");
    }
  };

  const handleDelete = async (noticeId: number) => {
    const response = await deleteNotice(noticeId.toString());
    console.log(response);
    if (response.resultCode === "OK") {
      // alert("공지사항이 삭제되었습니다.");
      showToast("공지사항이 삭제되었습니다.", "warning");
      setNotices((prev) => prev.filter((n) => n.noticeId !== noticeId));
    }
  };
  if (isLoading) {
    return "Loading...";
  }

  const pinnedNotices = notices.filter((n) => n.isPinned === "Y");
  const normalNotices = notices.filter((n) => n.isPinned !== "Y");

  // 고정된 공지사항은 항상 상단에 표시하고, 일반 공지사항만 페이지네이션 적용
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNormalNotices = normalNotices.slice(startIndex, endIndex);

  // 고정된 공지사항과 현재 페이지의 일반 공지사항을 합침
  const currentNotices = [...pinnedNotices, ...currentNormalNotices];

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 body-1 font-bold text-gray-900",
              i === 0 ? "w-8" : "flex-1",
              i === 1 ? "" : "text-center",
              i === 4 ? "max-w-20" : "",
              [2, 3].includes(i) ? "max-w-36" : "",
              i === 5
                ? "flex items-center justify-center min-w-32 max-w-48 m-0"
                : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {currentNotices.map((notice, idx) => (
        <li
          key={notice.noticeId}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            notice.noticeId,
            notice.title,
            notice.name,
            formatDate(notice.createdDate),
            notice.viewCount,
            notice.isPinned,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                i === 1
                  ? "flex items-center hover:decoration-gray-800 cursor-pointer hover:underline"
                  : "text-center",
                i === 4 ? "max-w-20" : "",
                [2, 3].includes(i) ? "max-w-36" : "",
                i === 5
                  ? "flex items-center justify-center gap-2 min-w-32 max-w-48 m-0"
                  : "",
                "text-gray-800"
              )}
              onClick={() => {
                if (i === 1) {
                  handleTitleClick(notice.noticeId);
                }
              }}
            >
              {i === 0 ? (
                // 고정된 공지사항은 "고정" 표시, 일반 공지사항은 순번 표시
                notice.isPinned === "Y" ? (
                  <span className="text-xs text-gray-500">고정</span>
                ) : (
                  startIndex +
                  (currentNotices.indexOf(notice) - pinnedNotices.length) +
                  1
                )
              ) : i === 1 ? (
                <>
                  {notice.isPinned === "Y" && (
                    <div className="mr-2 px-1">
                      <Pin />
                    </div>
                  )}
                  <p className="flex-1 line-clamp-1">{data}</p>
                </>
              ) : i === 5 ? (
                notice.isPinned === "Y" ? (
                  <>
                    <button
                      className="py-1 px-4 rounded border border-gray-800 body-1 font-medium text-gray-800 bg-gray-0 mr-2"
                      onClick={() => handleUnpin(notice.noticeId)}
                    >
                      {"고정 해제"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800 mr-2"
                      onClick={() => handlePin(notice.noticeId)}
                    >
                      {"고정"}
                    </button>
                    <button
                      onClick={() => handleDelete(notice.noticeId)}
                      className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red bg-gray-0"
                    >
                      {"삭제"}
                    </button>
                  </>
                )
              ) : (
                data
              )}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}

export default AnnouncementTable;
