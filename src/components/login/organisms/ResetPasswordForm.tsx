"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { LOGIN_ENDPOINT } from "@/lib/constants";

export default function ResetPasswordForm() {
  const { replace, refresh } = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const alertShown = useRef(false);

  useEffect(() => {
    const isVerified = sessionStorage.getItem('isVerified');
    const verifiedEmail = sessionStorage.getItem('verifiedEmail');
    const verifiedPhone = sessionStorage.getItem('verifiedPhone');

    if ((!isVerified || !verifiedEmail || !verifiedPhone) && !alertShown.current) {
      alertShown.current = true;
      alert("본인인증이 필요한 페이지입니다.");
      replace(`${LOGIN_ENDPOINT}`);
      return;
    }
    setIsAuthorized(true);
  }, []);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (!isAuthorized) return null;

  return (
    <div className="p-8 rounded-4xl shadow bg-gray-0">
      <form
        onSubmit={handleResetPassword}
        className="space-y-[38px] w-[530px] py-6"
      >
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
