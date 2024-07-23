"use client";

import { useState } from "react";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { ChevronDown } from "@/assets/icons/chevron";
import { Checked, Unchecked } from "@/assets/icons/checkbox";

export default function DisbandClubFormModal() {
  const [agreementValue, setAgreementValue] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
    setAgreementValue("");
    setIsChecked(false);
    alert(
      "해체 신청을 완료 하였습니다. 담당 주무부서팀에게 정보가 전달됩니다."
    );
  };

  return (
    <div id="disband-club-2" className="hidden modal">
      <Backdrop />
      <form
        className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[594px] p-8 rounded-xl bg-gray-0 shadow"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center h1 font-bold text-gray-900">
          {"동호회 해체 안내"}
        </h2>
        <div className="p-4 rounded-lg border border-gray-300">
          <div className="flex justify-between h4 font-bold text-gray-900">
            {"정말 동호회 해체를 진행하시겠어요?"}
            <ChevronDown className="w-5 h-5 rotate-180" />
          </div>
          <p className="mt-2 h4 font-normal text-gray-800">
            {`해체신청 시 담당 주무부서팀에게 정보가 전달됩니다.\n동호회 해체를 원하시면 밑에 동의 체크를 눌러주세요.\n남아있는 동호회비가 있다면 `}
            <span className="font-bold text-brand-orange">
              {"‘활동비 관리’"}
            </span>
            {`에서 활동비를 정산해주세요.`}
          </p>
        </div>
        <div className="space-y-4">
          <Input
            readonly
            name="name"
            label="동호회 명"
            value="어푸어푸 수영모임"
          />
          <Input readonly name="created" label="개설일자" value="2024.05.02" />
          <Input
            readonly
            name="description"
            label="한줄 소개"
            value="서울에 위치한 수영장에서의 운동"
          />
          <Input readonly name="people" label="동호회 인원" value="20명" />
          <div className="space-y-2">
            <Input
              autocomplete="off"
              name="agree"
              label="해체 신청 동의"
              placeholder="해체 신청에 동의합니다"
              currentValue={agreementValue}
              handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAgreementValue(e.target.value)
              }
            />
            <label
              htmlFor="check"
              className="flex gap-4 h4 font-medium text-gray-900 cursor-pointer select-none"
            >
              <input
                id="check"
                name="check"
                type="checkbox"
                className="peer hidden"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <Checked className="hidden peer-checked:block" />
              <Unchecked className="block peer-checked:hidden" />
              {"동호회 해체 신청에 동의합니다"}
            </label>
          </div>
        </div>
        <Button
          content="해체하기"
          primary
          type="submit"
          disabled={agreementValue !== "해체 신청에 동의합니다" || !isChecked}
        />
      </form>
    </div>
  );
}
