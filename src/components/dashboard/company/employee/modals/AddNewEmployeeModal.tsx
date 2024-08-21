"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Separator from "@/components/common/Separator";
import { Close } from "@/assets/icons/action";
import { ChevronRight } from "@/assets/icons/chevron";

export default function AddNewEmployeeModal() {
  return (
    <div id="add-new-employee" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[524px] p-8 rounded-xl bg-gray-0 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-center h1 font-bold text-gray-900">
            {"신규 임직원 이메일 등록하기"}
          </h2>
          <button onClick={() => closeModal()}>
            <Close className="w-8 h-8" />
          </button>
        </div>
        <Input
          name="email"
          label="신규 임직원의 이메일 주소"
          placeholder="이메일 주소를 입력해주세요"
        />
        <Separator />
        <button className="flex items-center gap-2" onClick={() => {}}>
          {"가입 안내서 양식 보기"}
          <ChevronRight className="w-6 h-6" />
        </button>
        <Button content="전송하기" primary />
      </div>
    </div>
  );
}
