"use client";

import { useEffect, useState } from "react";
import { closeModal, cn } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import { getAccessToken, getClubId } from "@/lib/cookies";
import { useToast } from "@/components/common/ToastContainer";

const deleteReasonList = [
  "동호회 활동과 무관한 사진",
  "욕설, 음란, 음해, 비방 등 부적절한 사진",
  "이용자에게 불쾌감을 주는 사진",
  "개인정보 노출 우려",
];

export default function DeletePictureModal() {
  const [deleteReason, setDeleteReason] = useState<string | undefined>();
  const [modalParams, setModalParams] = useState<any>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const modal = document.getElementById("delete-picture");
    // console.log('모달 엘리먼트:', modal); // 모달 엘리먼트 확인

    if (modal) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-modal-params"
          ) {
            const newParams = modal.dataset.modalParams;
            // console.log('새로운 모달 파라미터:', newParams); // 파라미터 확인

            if (newParams) {
              // console.log('파라미터 파싱:', JSON.parse(newParams)); // 파싱된 파라미터 확인
              setModalParams(JSON.parse(newParams));
            }
          }
        });
      });

      observer.observe(modal, {
        attributes: true,
        attributeFilter: ["data-modal-params"],
      });

      return () => observer.disconnect();
    }
  }, []);

  const handleDelete = async () => {
    try {
      const token = await getAccessToken();
      const clubId = await getClubId();
      console.log("clubId", clubId);

      const response = await fetch(
        `/api/v1/executive/club/${clubId}/activity-feed/${modalParams.activityId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: deleteReason,
          }),
        }
      );
      if (response.ok) {
        // alert("삭제가 완료되었습니다.");
        showToast("삭제가 완료되었습니다.", "success");
        closeModal();
        window.location.reload();
      } else {
        // alert("삭제에 실패했습니다.");
        showToast("삭제에 실패했습니다.", "error");
      }
    } catch (error) {
      console.error("삭제 요청 오류:", error);
    }
  };

  const handleClose = () => {
    const modal = document.getElementById("delete-picture");
    if (modal) {
      delete modal.dataset.modalParams; // params 제거
    }
    closeModal();
  };

  useEffect(() => {
    console.log("이유 선택 : ", deleteReason);
  }, [deleteReason]); // deleteReason이 변경될 때마다 실행

  useEffect(() => {
    if (modalParams) {
      console.log("모달 파라미터가 변경되었습니다:", modalParams);
    }
  }, [modalParams]); // modalParams가 변경될 때마다 실행

  return (
    <div id="delete-picture" className="hidden modal">
      <Backdrop />
      <div className="absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 p-8 rounded-xl bg-gray-0 shadow">
        <h2 className="h1 font-bold text-gray-900">{"활동 사진 삭제"}</h2>
        <div className="space-y-2 p-4 border border-gray-300 rounded-lg bg-gray-0">
          <span className="h4 font-bold text-gray-900">
            {"삭제 사유를 선택해주세요"}
          </span>
          <p className="h4 font-normal text-gray-800">
            {"삭제사유는 업로드한 동호회원의 메일로 안내메세지가 발송됩니다."}
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
          <Button content="취소" onClick={handleClose} />
          <Button
            content="삭제하기"
            primary
            disabled={!deleteReason}
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
