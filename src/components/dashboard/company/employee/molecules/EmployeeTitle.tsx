"use client";

import { openModal } from "@/lib/utils";
import { Plus } from "@/assets/icons/action";

export default function EmployeeTitle() {
  return (
    <div className="space-y-2 p-8 rounded-xl bg-gray-0">
      <h2 className="h1 font-bold text-brand-orange">{"회원 관리"}</h2>
      <div className="flex items-end justify-between">
        <p className="h4 font-medium text-gray-900">
          {`C'omo에 가입된 임직원들을 조회하고 관리합니다.\n새로운 임직원 있다면 추가하기 버튼을 통해 프로그램 사용 권한을 부여하세요.`}
        </p>
        <button
          className="flex items-center gap-[3px] py-1 pl-3 pr-2.5 rounded body-1 font-medium text-gray-50 bg-gray-900"
          onClick={() => openModal("add-new-employee")}
        >
          {"신규 임직원 추가"}
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
