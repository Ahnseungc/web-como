"use client";

import { useState } from "react";
import { closeModal, cn } from "@/lib/utils";
import { emailRegex } from "@/lib/regex";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Separator from "@/components/common/Separator";
import InfoTooltipButton from "@/components/dashboard/common/InfoTooltipButton";
import { Close, Remove } from "@/assets/icons/action";
import { ChevronRight } from "@/assets/icons/chevron";

export default function AddNewEmployeeModal() {
  const [input, setInput] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const email = input;
      setEmails((prev) => [...prev, email]);
      setInput("");
    }
  };

  const EmailChip = ({ email }: { email: string }) => {
    return (
      <div
        className={cn(
          "flex items-center gap-2 py-3 px-4 rounded-full body-1 font-medium",
          emailRegex.test(email)
            ? "border border-gray-400 text-gray-800 bg-gray-50"
            : "text-gray-50 bg-point-red"
        )}
      >
        {email}
        <button
          onClick={() =>
            setEmails((prev) => prev.filter((value) => value !== email))
          }
        >
          <Remove
            className={cn(
              "w-5 h-5",
              emailRegex.test(email) ? "text-gray-500" : "text-gray-50"
            )}
          />
        </button>
      </div>
    );
  };

  return (
    <div id="add-new-employee" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[1200px] p-8 rounded-xl bg-gray-0 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-center h1 font-bold text-gray-900">
              {"신규 임직원 이메일 등록하기"}
            </h2>
            <InfoTooltipButton
              id="add-employee-tooltip"
              title="임직원 추가 절차 안내"
              content="임직원에게 전송되는 가입 안내 이메일을 통해 임직원은 가입 절차를 밟을 수 있습니다."
            />
          </div>
          <button onClick={() => closeModal()}>
            <Close className="w-8 h-8" />
          </button>
        </div>
        <Input
          id="email"
          name="email"
          label="신규 임직원의 이메일 주소"
          placeholder="이메일 주소를 입력 후 엔터키를 눌러주세요"
          currentValue={input}
          handleInputChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {emails.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {emails.map((email) => (
              <EmailChip key={email} email={email} />
            ))}
          </div>
        )}
        <Separator />
        <button
          className="flex items-center gap-2 h3 font-semibold text-gray-900"
          onClick={() => {}}
        >
          {"가입 안내서 양식 보기"}
          <ChevronRight className="w-6 h-6" />
        </button>
        <Button content="전송하기" primary disabled={emails.length < 1} />
      </div>
    </div>
  );
}
