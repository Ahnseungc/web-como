"use client";

import { useState } from "react";
import { closeModal, cn, openModal } from "@/lib/utils";
import type { ClubPicture } from "@/components/dashboard/club/manage/templates/ClubPicture";
import Avatar from "@/components/common/Avatar";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";

const deleteReasonList = [
  "동호회 활동과 무관한 사진",
  "욕설, 음란, 음해, 비방 등 부적절한 사진",
  "이용자에게 불쾌감을 주는 사진",
  "개인정보 노출 우려",
];

interface Props {
  item: ClubPicture;
}

export default function ClubPictureItem({ item }: Props) {
  const [deleteReason, setDeleteReason] = useState<string | undefined>();

  return (
    <div className="space-y-6 p-8 rounded-2xl bg-gray-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar size="w-[60px] h-[60px]" />
          <div className="flex flex-col">
            <span className="h4 font-bold text-gray-900">{item.name}</span>
            <div className="space-x-2 body-1 font-medium text-gray-500">
              <span>{item.department}</span>
              <span>{item.date}</span>
            </div>
          </div>
        </div>
        <button
          className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800"
          onClick={() => openModal("delete-picture")}
        >
          {"삭제"}
        </button>
        <div id="delete-picture" className="hidden modal">
          <Backdrop />
          <div className="absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 p-8 rounded-xl bg-gray-0 shadow">
            <h2 className="h1 font-bold text-gray-900">{"활동 사진 삭제"}</h2>
            <div className="space-y-2 p-4 border border-gray-300 rounded-lg bg-gray-0">
              <span className="h4 font-bold text-gray-900">
                {"삭제 사유를 선택해주세요"}
              </span>
              <p className="h4 font-normal text-gray-800">
                {
                  "삭제사유는 업로드한 동호회원의 메일로 안내메세지가 발송됩니다."
                }
              </p>
            </div>
            <div className="space-y-4">
              {deleteReasonList.map((reason) => (
                <button
                  key={reason}
                  className={cn(
                    "flex items-center w-full h-[60px] px-3 rounded-md h4 font-bold transition duration-200",
                    reason === deleteReason
                      ? "text-gray-0 bg-brand-orange"
                      : "text-gray-900 bg-gray-100"
                  )}
                  onClick={() => {
                    if (reason === deleteReason) {
                      setDeleteReason(undefined);
                    } else {
                      setDeleteReason(reason);
                    }
                  }}
                >
                  {reason}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button content="취소" onClick={closeModal} />
              <Button
                content="삭제하기"
                primary
                disabled={!deleteReason}
                onClick={() => {
                  alert("삭제가 완료되었습니다.");
                  closeModal();
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <p className="h3 font-medium text-gray-900">{item.content}</p>
      <div className="flex gap-4 flex-nowrap w-[75vw] pb-4 overflow-x-scroll">
        {Array.from({ length: 8 }).map((picture, i) => (
          <div key={i} className="min-w-96 min-h-96 bg-gray-300" />
        ))}
      </div>
    </div>
  );
}
