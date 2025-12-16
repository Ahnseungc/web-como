"use client";

import { closeModal, openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Close } from "@/assets/icons/action";
import { ChevronRight } from "@/assets/icons/chevron";
import { useState, useEffect } from "react";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import { getAccessToken } from "@/lib/cookies";

export default function DeleteReasonModal() {
  const [modalParams, setModalParams] = useState<any>(null);
  const [memberData, setMemberData] = useState<any>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

  useEffect(() => {
    const modal = document.getElementById("delete-reason");
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
              const parsedParams = JSON.parse(newParams);
              // console.log('파싱된 파라미터:', parsedParams); // 파싱된 파라미터 확인
              setModalParams(parsedParams);
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

  useEffect(() => {
    const loadMemberData = async () => {
      // console.log('modalParams:', modalParams); // modalParams 확인
      if (!modalParams?.memberId) return;

      try {
        // console.log('API 호출 시작:', modalParams.memberId); // API 호출 확인
        const res = await getData(
          `v1/manager/member/${modalParams.memberId}`,
          true
        );
        // console.log('API 응답:', res); // API 응답 확인
        if (
          String(res.resultCode) === "200" ||
          String(res.resultCode) === "OK"
        ) {
          setMemberData(res.data);
        }
      } catch (error) {
        console.error("직원 정보 로딩 오류:", error);
      }
    };

    loadMemberData();
  }, [modalParams]);

  // console.log('현재 memberData:', memberData); // 현재 memberData 확인

  const handleDelete = async () => {
    if (!deleteReason) {
      setErrorMessage("삭제 사유를 입력해주세요.");
      return;
    }

    try {
      const token = await getAccessToken();
      const response = await fetch(
        `/api/v1/manager/member/${modalParams.memberId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ reason: deleteReason }),
        }
      );

      // console.log('삭제 응답:', response.status);

      if (response.ok) {
        closeModal("delete-reason");
        openModal("delete-success");
      } else {
        console.error("삭제 실패");
      }
    } catch (error) {
      console.error("삭제 요청 오류:", error);
    }

    setErrorMessage(""); // 삭제 후 에러 메시지 초기화
  };

  return (
    <div id="delete-reason" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 w-full max-w-[600px] p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-8 h-full max-h-screen overflow-y-auto p-4 scrollbar-custom">
          <div className="flex items-center justify-between">
            <h2 className="text-center h1 font-bold text-gray-900">
              {"회원 삭제 사유"}
            </h2>
            <button onClick={() => closeModal("delete-reason")}>
              <Close className="w-8 h-8" />
            </button>
          </div>
          <div className="pb-8 border-b border-gray-400">
            <Input
              label={`${memberData?.name || "김오모"}님의 회원 삭제 사유`}
              value={deleteReason}
              onChange={(e) => {
                setDeleteReason(e.target.value);
                setErrorMessage(""); // 입력값이 변경될 때 에러 메시지 초기화
              }}
              placeholder="삭제 사유를 입력해주세요"
            />
            {errorMessage && (
              <p
                className="mt-2 text-[16px] font-[500]"
                style={{ color: "#FF3D00" }}
              >
                {errorMessage}
              </p>
            )}{" "}
            {/* 에러 메시지 표시 */}
          </div>
          <div className="flex items-center justify-between text-gray-900 cursor-pointer select-none">
            <div className="h3 font-semibold">
              {"자동으로 회원 삭제되는 경우"}
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
          <div className="flex gap-2 justify-center">
            <Button primary content="삭제하기" onClick={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}
