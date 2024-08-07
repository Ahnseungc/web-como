"use client";

import { useState } from "react";
import { closeModal, cn } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import InputTracer from "@/components/common/InputTracer";
import Checkbox from "@/components/common/Checkbox";
import { ChevronDown } from "@/assets/icons/chevron";

const DEFAULT_TEXT = "해체 신청에 동의합니다";

const initialInputValues = { reason: "", current: "", correct: "" };

export default function ForceDisbandClubFormModal() {
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const [isAgree, setIsAgree] = useState<{
    sentence: boolean;
    check: boolean;
  }>({ sentence: false, check: false });
  const [inputValues, setInputValues] = useState<{
    reason: string;
    current: string;
    correct: string;
  }>(initialInputValues);

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

    setInputValues(initialInputValues);
    setIsAgree({ sentence: false, check: false });

    alert(
      "해체 신청을 완료 하였습니다. 담당 주무부서팀에게 정보가 전달됩니다."
    );
  };

  return (
    <div id="force-disband" className="hidden modal">
      <Backdrop />
      <form
        className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[594px] p-8 rounded-xl bg-gray-0 shadow"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center h1 font-bold text-gray-900">
          {"동호회 강제 해체 안내"}
        </h2>
        <div
          className="p-4 rounded-lg border border-gray-300 cursor-pointer select-none"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          <div className="flex justify-between h4 font-bold text-gray-900">
            {"정말 동호회 해체를 진행하시겠어요?"}
            <ChevronDown
              className={cn(
                "w-5 h-5 transition duration-300",
                showInfo ? "rotate-180" : ""
              )}
            />
          </div>
          {showInfo && (
            <p className="mt-2 h4 font-normal text-gray-800">
              {`해제신청 시 해당 동호회 임원에게 정보가 전달됩니다.\n동호회는 강제 해체 이후 `}
              <span className="font-bold text-brand-orange">{"15일간"}</span>
              {` 해체 대기로 전환됩니다. 이후 완전히 사라지니 유의해주세요.`}
            </p>
          )}
        </div>
        <div className="space-y-4">
          <Input
            name="reason"
            label="해체 사유"
            placeholder="해체 사유를 작성해 주세요"
            currentValue={inputValues.reason}
            handleInputChange={(e) =>
              setInputValues((prev) => {
                return { ...prev, reason: e.target.value };
              })
            }
          />
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
              name="check"
              content="동호회 해체 신청에 동의합니다"
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
          primary
          content="해체하기"
          type="submit"
          disabled={!isAgree.sentence || !isAgree.check || !inputValues.reason}
        />
      </form>
    </div>
  );
}
