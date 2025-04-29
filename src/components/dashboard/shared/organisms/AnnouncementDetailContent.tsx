"use client";
import { useEffect, useState } from "react";
import { Pin } from "@/assets/icons/info";
import Image from "next/image";
import {
  deleteNotice,
  pinNotice,
  unpinNotice,
} from "@/api/actions/club/notice";
import { useRouter } from "next/navigation";

interface NoticeDetail {
  data?: {
    id: number;
    title: string;
    createdDate: number[];
    viewCount: number;
    content?: string;
    writerName: string;
    photos?: string[];
  };
  [key: string]: any;
}

interface Props {
  isEditable?: boolean;
}

export default function AnnouncementDetailContent({ isEditable }: Props) {
  const [detail, setDetail] = useState<NoticeDetail | null>(null);
  const [isPinned, setIsPinned] = useState<"Y" | "N">("N");
  const router = useRouter();
  useEffect(() => {
    const stored = localStorage.getItem("noticeDetail");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDetail(parsed);
      if (parsed?.isPinned) {
        setIsPinned(parsed.isPinned);
      }
    }
  }, []);

  if (!detail || !detail.data)
    return <div className="p-8">상세 정보를 불러오는 중...</div>;

  const { id, title, writerName, createdDate, viewCount, content, photos } =
    detail.data;

  const formatDate = (dateArray: number[]) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  const handlePin = (noticeId: number) => {
    if (isPinned === "Y") {
      setIsPinned("N");
      setDetail((prev) =>
        prev && prev.data
          ? { ...prev, data: { ...prev.data, isPinned: "N" } }
          : prev
      );
      unpinNotice(noticeId);
    } else {
      setIsPinned("Y");
      setDetail((prev) =>
        prev && prev.data
          ? { ...prev, data: { ...prev.data, isPinned: "Y" } }
          : prev
      );
      pinNotice(noticeId);
    }
  };
  const handleDelete = async (noticeId: number) => {
    await deleteNotice(noticeId);
    alert("공지사항이 삭제되었습니다.");
    router.replace("/club/dashboard/manage/announcement");
  };

  return (
    <div className="p-8 rounded-xl bg-gray-0">
      <div className="flex items-start justify-between">
        <h2 className="mb-6 font-semibold text-gray-900">{"공지사항"}</h2>
        {isEditable ? (
          isPinned === "Y" ? (
            <button
              className="py-1 px-4 rounded border border-gray-800 body-1 font-medium text-gray-800 bg-gray-0"
              onClick={() => handlePin(id)}
            >
              {"고정 해제"}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => handlePin(id)}
                className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800"
              >
                {"고정"}
              </button>
              <button
                onClick={() => handleDelete(id)}
                className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red bg-gray-0"
              >
                {"삭제"}
              </button>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
      <ul>
        <li className="flex border-y border-gray-400">
          <div className="w-28 py-3 px-6 body-1 font-bold text-gray-900 bg-gray-200">
            제목
          </div>
          <div className="flex items-center py-3 px-6 body-1 font-medium text-gray-800 bg-gray-0 truncate">
            {isPinned === "Y" && (
              <div className="mr-2 px-1">
                <Pin />
              </div>
            )}
            <p className="truncate">{title}</p>
          </div>
        </li>
        <li className="flex border-b border-gray-400">
          <div className="w-28 py-3 px-6 body-1 font-bold text-gray-900 bg-gray-200">
            작성자
          </div>
          <div className="flex items-center py-3 px-6 body-1 font-medium text-gray-800 bg-gray-0 truncate">
            {writerName}
          </div>
        </li>
        <li className="flex border-b border-gray-400">
          <div className="w-28 py-3 px-6 body-1 font-bold text-gray-900 bg-gray-200">
            작성일자
          </div>
          <div className="flex items-center py-3 px-6 body-1 font-medium text-gray-800 bg-gray-0 truncate">
            {formatDate(createdDate)}
          </div>
        </li>
        <li className="flex border-b border-gray-400">
          <div className="w-28 py-3 px-6 body-1 font-bold text-gray-900 bg-gray-200">
            조회수
          </div>
          <div className="flex items-center py-3 px-6 body-1 font-medium text-gray-800 bg-gray-0 truncate">
            {viewCount}
          </div>
        </li>
      </ul>
      <div className="py-8 px-6 border-b-[2px] border-gray-500">
        {photos && photos.length > 0 && (
          <div className="flex gap-8 mb-6">
            {photos.map((photo, i) => (
              <Image
                key={i}
                src={photo}
                alt={photo}
                width={350}
                height={350}
                className="rounded-lg aspect-square max-w-[350px]"
              />
            ))}
          </div>
        )}
        <p className="body-1 font-medium text-gray-800">{content || ""}</p>
      </div>
      {/* <div className="space-y-2">
        <div className="body-1 font-bold text-gray-600">{"첨부 파일"}</div>
        <ul className="space-y-2">
          {[1, 2, 3].map((file, i) => (
            <li
              key={i}
              className="flex items-center justify-between p-3 rounded-md border border-gray-400 bg-gray-0"
            >
              <div className="flex gap-2 h4 font-medium text-gray-800">
                <Document className="w-6 h-6 text-gray-500" />
                {"동호회 운영 지침 사내 임직원 안내용 PT자료.pdf"}
              </div>
              <DocUtilButtons />
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
