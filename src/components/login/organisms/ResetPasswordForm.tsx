"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function ResetPasswordForm() {
  return (
    <div className="p-8 rounded-4xl shadow bg-gray-0">
      <form action="" className="space-y-[38px] w-[530px] py-6">
        <h2 className="h1 text-center font-bold text-gray-1000">
          {"비밀번호 재설정"}
        </h2>
        <div className="space-y-4">
          <Input
            name="password"
            type="password"
            placeholder="새 비밀번호 입력(8~20자)"
          />
          <Input
            name="rePassword"
            type="password"
            placeholder="새 비밀번호 재입력"
          />
        </div>
        <Button content="확인" primary />
      </form>
    </div>
  );
}
