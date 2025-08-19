"use client";

import Image from "next/image";
import type { ClubWebActivityInfoDTO } from "@/api/types/club/activity";
import { formatDate, openModal } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";

interface Props {
  item: ClubWebActivityInfoDTO;
  readonly?: boolean;
}

export default function ClubPictureItem({ item, readonly }: Props) {
  console.log("ClubPictureItem 실행됨");
  console.log("ClubPictureItem 에서 item", item);

  const handleDeleteClick = () => {
    console.log("삭제 버튼이 클릭되었습니다:", item.id); // 클릭 추적
    openModal("delete-picture", { activityId: item.id });
  };

  return (
    <div className="space-y-6 p-8 rounded-2xl bg-gray-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar size="w-[60px] h-[60px]" src={item.writerProfileImage} />
          <div className="flex flex-col">
            <span className="h4 font-bold text-gray-900">
              {item.writerNickname}
            </span>
            <div className="space-x-2 body-1 font-medium text-gray-500">
              <span>{item.writerDepartment}</span>
              <span>{formatDate(new Date(item.date))}</span>
            </div>
          </div>
        </div>
        {!readonly && (
          <button
            className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800"
            onClick={handleDeleteClick}
          >
            {"삭제"}
          </button>
        )}
      </div>
      <p className="h3 font-medium text-gray-900">{item.content}</p>
      <div className="flex gap-4 flex-nowrap w-[75vw] pb-4 overflow-x-auto scrollbar-custom">
        {item.photos.map((picture, i) => (
          <div key={i} className="relative w-80 h-80 bg-gray-300">
            <Image
              src={picture}
              alt={`사진 ${i}`}
              fill
              sizes="30vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
