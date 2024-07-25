"use client";

import { useState } from "react";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import InputTracer from "@/components/common/InputTracer";
import Checkbox from "@/components/common/Checkbox";
import { ChevronDown } from "@/assets/icons/chevron";

const DEFAULT_TEXT = "해체 신청에 동의합니다";

export default function DisbandClubFormModal() {
  const [isAgree, setIsAgree] = useState<{
    sentence: boolean;
    check: boolean;
  }>({ sentence: false, check: false });
  const [inputValues, setInputValues] = useState<{
    current: string;
    correct: string;
  }>({ current: "", correct: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValues((prev) => {
      return { ...prev, current: value };
    });

    if (DEFAULT_TEXT.startsWith(value)) {
      setInputValues((prev) => {
        return { ...prev, correct: value };
      });
    }

    if (value === DEFAULT_TEXT) {
      setIsAgree((prev) => {
        return { ...prev, sentence: true };
      });
    } else {
      setIsAgree((prev) => {
        return { ...prev, sentence: false };
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();

    setInputValues({ current: "", correct: "" });
    setIsAgree({ sentence: false, check: false });

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
          <div className="relative space-y-2">
            <label
              htmlFor="agreement"
              className="h3 font-semibold text-gray-900"
            >
              {"해체 신청 동의"}
            </label>
            <InputTracer
              name="agreement"
              defaultText="해체 신청에 동의합니다"
              currentValue={inputValues.current}
              correctValue={inputValues.correct}
              handleChange={handleInputChange}
            />
            <Checkbox
              text="동호회 해체 신청에 동의합니다"
              checked={isAgree.check}
              onChange={(e) =>
                setIsAgree((prev) => {
                  return { ...prev, check: e.target.checked };
                })
              }
            />
          </div>
        </div>
        <Button
          content="해체하기"
          primary
          type="submit"
          disabled={!isAgree.sentence || !isAgree.check}
        />
      </form>
    </div>
  );
}
