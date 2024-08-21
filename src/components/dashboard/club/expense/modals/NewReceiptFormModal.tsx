"use client";

import { useState } from "react";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import ImageInput from "@/components/common/ImageInput";
import { Close } from "@/assets/icons/action";

export default function NewReceiptFormModal() {
  const [currentImages, setCurrentImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("수령증 작성 완료");
    closeModal();
  };

  return (
    <div id="new-receipt-form" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 w-full max-w-[1000px] p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-6 h-full max-h-screen overflow-y-auto p-4 scrollbar-custom">
          <div className="flex justify-between">
            <h1 className="font-bold text-gray-900">{"수령증 작성"}</h1>
            <button onClick={() => closeModal()}>
              <Close className="w-8 h-8 text-gray-600" />
            </button>
          </div>
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h3 font-semibold text-gray-900">
                  {"동호회 정보"}
                </div>
                <div className="w-full min-h-[60px] py-4 px-3 rounded-md truncate h4 font-medium text-gray-900 bg-gray-100">
                  {"동호회명 : 어푸어푸 수영 동호회"}
                </div>
                <div className="w-full min-h-[60px] py-4 px-3 rounded-md truncate h4 font-medium text-gray-900 bg-gray-100">
                  {"회장 : 김오모 / 부회장 : 김오모 / 총무 : 김오모"}
                </div>
              </div>
              <Input
                name="personInCharge"
                label="지급 담당자"
                type="text"
                value="구오모 / 대리 / 인사팀"
                readOnly
              />
            </div>
            <hr className="border-gray-400" />
            <div className="space-y-6">
              <Input
                name="author"
                label="작성자"
                type="text"
                value="송지은 / 경영지원팀 / 대리 / 총무(동호회 직책)"
                readOnly
              />
              <Input
                name="content"
                label="품의 내용"
                type="text"
                readOnly
                value="도서구매"
              />
              <Input
                name="received"
                label="수령 내역"
                type="text"
                inputStyle="max-w-[350px]"
                readOnly
                value="9,999,999원"
              />
              <ImageInput
                required
                name="signature"
                label="담당자 사인 첨부"
                caption="담당자의 서명을 첨부해 주세요."
                max={1}
                currentImages={currentImages}
                setCurrentImages={setCurrentImages}
              />
              <Input
                name="note"
                label="비고"
                type="text"
                maxLength={300}
                placeholder="내용을 입력해 주세요."
              />
            </div>
            <Button
              content="수령증 제출하기"
              primary
              disabled={currentImages.length === 0}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
