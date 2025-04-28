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

  useEffect(() => {
    const fetchNotices = async () => {
      const result = await getNotices(currentPage, "");
      const { noticeList, currentPage: cur, maxPage } = result.data;
      setNotices(noticeList);
      setIsLoading(false);
    };
    fetchNotices();
  }, []);

  const formatDate = (dateArray: number[]) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  // 최대 2개까지 고정 가능하도록 pin/unpin 구현
  const handlePin = (noticeId: number) => {
    const pinnedCount = notices.filter((n) => n.isPinned === "Y").length;
    if (pinnedCount >= 2) {
      alert("공지사항 상단 고정은 2개까지 가능합니다.");
      return;
    }
    setNotices((prev) =>
      prev.map((n) => (n.noticeId === noticeId ? { ...n, isPinned: "Y" } : n))
    );
    pinNotice(noticeId);
  };
  const handleUnpin = (noticeId: number) => {
    setNotices((prev) =>
      prev.map((n) => (n.noticeId === noticeId ? { ...n, isPinned: "N" } : n))
    );
    unpinNotice(noticeId);
  };

  const handleTitleClick = async (noticeId: number) => {
    try {
      let detail = await getNoticeDetail(noticeId);
      detail = {
        ...detail,
        isPinned: notices.find((n) => n.noticeId === noticeId)?.isPinned,
      };
      // 상세 페이지에서 활용할 수 있도록 localStorage에 저장 (또는 필요시 state로 전달)
      localStorage.setItem("noticeDetail", JSON.stringify(detail));
      push(`${pathname}/${noticeId}`);
    } catch (error) {
      alert("공지사항 상세 정보를 불러오지 못했습니다.");
    }
  };

  const handleDelete = async (noticeId: number) => {
    const response = await deleteNotice(noticeId);
    console.log(response);
    if (response.resultCode === "OK") {
      alert("공지사항이 삭제되었습니다.");
      setNotices((prev) => prev.filter((n) => n.noticeId !== noticeId));
    }
  };
  if (isLoading) {
    return "Loading...";
  }

  const pinnedNotices = notices.filter((n) => n.isPinned === "Y");
  const normalNotices = notices.filter((n) => n.isPinned !== "Y");

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
      {pinnedNotices.map((notice, idx) => (
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
                  ? "flex items-center hover:decoration-gray-800 cursor-pointer"
                  : "text-center",
                i === 4 ? "max-w-20" : "",
                [2, 3].includes(i) ? "max-w-36" : "",
                i === 5
                  ? "flex items-center justify-center min-w-32 max-w-48 m-0"
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
                idx + 1
              ) : data === "Y" ? (
                <button
                  className="py-1 px-4 rounded border border-gray-800 body-1 font-medium text-gray-800 bg-gray-0"
                  onClick={() => handleUnpin(notice.noticeId)}
                >
                  {"고정 해제"}
                </button>
              ) : i === 1 ? (
                <>
                  <div className="mr-2 px-1">
                    <Pin />
                  </div>
                  <p className="flex-1 line-clamp-1">{data}</p>
                </>
              ) : (
                data
              )}
            </div>
          ))}
        </li>
      ))}
      {normalNotices.map((notice, idx) => (
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
                  ? "hover:decoration-gray-800 cursor-pointer"
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
                pinnedNotices.length + idx + 1
              ) : i !== 5 ? (
                data
              ) : data === "N" ? (
                <>
                  <button
                    className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800"
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
              ) : (
                ""
              )}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}

export default AnnouncementTable;
