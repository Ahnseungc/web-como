"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/login/organisms/LoginForm";
// import Button from "@/components/common/Button";

export default function LoginPage() {
  // const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4">
      <LoginForm />
      {/* <div className="w-full max-w-[530px] mt-6">
        <Button
          content="신규 동호회 개설 신청하러 가기"
          type="button"
          orange
          className="!bg-orange !border-orange !rounded-[6px]"
          onClick={() => router.push("/club-apply")}
        />
      </div> */}
    </div>
  );
}
