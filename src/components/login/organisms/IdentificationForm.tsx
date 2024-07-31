"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function IdentificationForm() {
  const { replace } = useRouter();

  const handleIdentify = (e: React.FormEvent) => {
    e.preventDefault();
    replace("/login/reset");
  };

  return (
    <div className="p-8 rounded-4xl shadow bg-gray-0">
      <form onSubmit={handleIdentify} className="space-y-[38px] w-[530px] py-6">
        <h2 className="h1 text-center font-bold text-gray-1000">
          {"본인확인"}
        </h2>
        <div className="space-y-4">
          <Input name="name" type="text" placeholder="이름" />
          <Input name="company" type="text" placeholder="기업명" />
          <Input name="carrier" type="text" placeholder="통신사" />
          <Input name="phone" type="text" placeholder="핸드폰 번호" />
        </div>
        <Button content="인증번호 전송" primary />
      </form>
    </div>
  );
}
