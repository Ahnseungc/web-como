"use client";

import { useState } from "react";
import { closeModal, openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Input, { InputLabel } from "@/components/common/Input";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import { Close } from "@/assets/icons/action";

export default function EditEmployeeInfoModal() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <div id="employee-edit" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 w-full max-w-[600px] p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-6 h-full max-h-screen overflow-y-auto p-4 scrollbar-custom">
          <div className="flex items-center justify-between">
            <h2 className="text-center h1 font-bold text-gray-900">
              {"회원 정보 수정"}
            </h2>
            <button onClick={() => closeModal()}>
              <Close className="w-8 h-8" />
            </button>
          </div>
          <div className="space-y-4">
            <Input id="name" label="이름" value="김오모" />
            <Input id="dept" label="부서" value="경영지원팀" />
            <Input id="rank" label="직책" value="대리" />
            <Input
              id="email"
              type="email"
              label="이메일 주소"
              value="omo@omo.com"
            />
            <Input id="phone" label="핸드폰 번호" value="010-0000-1111" />
          </div>
          <div className="space-y-3">
            <InputLabel label="권한 부여" />
            <Checkbox
              name="none"
              content="권한 없음"
              checked={!isAdmin}
              onChange={(e) => setIsAdmin(!e.target.checked)}
            />
            <Checkbox
              name="admin"
              content="동호회 관리자 권한"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </div>
          <Button
            primary
            content="수정하기"
            onClick={() => {
              closeModal("employee-edit");
              openModal("edit-success");
            }}
          />
        </div>
      </div>
    </div>
  );
}
