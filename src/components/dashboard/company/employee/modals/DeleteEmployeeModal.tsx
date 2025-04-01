"use client";

import { useState, useEffect } from "react";
import { closeModal, openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import { Close } from "@/assets/icons/action";
import { getAccessToken } from "@/lib/cookies";

export default function DeleteEmployeeModal() {
  const [modalParams, setModalParams] = useState<any>(null);

  useEffect(() => {
    const modal = document.getElementById('employee-delete');
    if (modal) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-modal-params') {
            const newParams = modal.dataset.modalParams;
            if (newParams) {
              setModalParams(JSON.parse(newParams));
            }
          }
        });
      });

      observer.observe(modal, {
        attributes: true,
        attributeFilter: ['data-modal-params']
      });

      return () => observer.disconnect();
    }
  }, []);

  const handleDelete = async () => {
    try {
      const token = await getAccessToken();
      const response = await fetch(`/api/server/v1/manager/member/${modalParams.memberId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      const result = await response.json();
      console.log("삭제 결과:", result);

      if (result.resultCode === 'OK') {
        closeModal("employee-delete");
        openModal("delete-success");
      } else {
        console.error("삭제 실패:", result.resultMessage);
      }
    } catch (error) {
      console.error("삭제 요청 오류:", error);
    }
  };

  return (
    <div id="employee-delete" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 w-full max-w-[400px] p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-6 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-center h2 font-bold text-gray-900">
              {"회원 삭제"}
            </h2>
            <button onClick={() => closeModal("employee-delete")}>
              <Close className="w-8 h-8" />
            </button>
          </div>
          <p className="text-center body-1 text-gray-600">
            {"정말 이 회원을 삭제하시겠습니까?"}
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              content="취소"
              onClick={() => closeModal("employee-delete")}
            />
            <Button
              primary
              content="삭제"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
