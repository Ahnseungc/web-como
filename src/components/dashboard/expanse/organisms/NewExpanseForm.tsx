"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import DatePicker from "@/components/common/DatePicker";
import Input from "@/components/common/Input";
import RadioButton from "@/components/common/RadioButton";

export default function NewExpanseReportForm() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  return (
    <form className="space-y-3 w-full">
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <h3 className="h2 font-bold text-gray-900">{"기본 정보"}</h3>
        <Input
          name="clubName"
          label="동호회명"
          type="text"
          value="산악동호회"
          readonly
        />
        <div className="flex flex-col gap-2">
          <span className="h3 font-semibold text-gray-900">
            {"동호회 임원"}
          </span>
          <Input
            name="clubAdmin1"
            type="text"
            value="동호회 회장 : 송지은 (경영기획팀)"
            readonly
          />
          <Input
            name="clubAdmin2"
            type="text"
            value="동호회 부회장 : 송지은 (경영기획팀)"
            readonly
          />
          <Input
            name="clubAdmin3"
            type="text"
            value="총무 : 송지은 (경영기획팀)"
            readonly
          />
        </div>
        <Input
          required
          name="content"
          label="품의 내용"
          type="text"
          maxChar={300}
          placeholder="내용을 입력해주세요."
        />
        <Input
          required
          name="estimatedPrice"
          label="예상 비용"
          type="text"
          placeholder="금액을 적어주세요"
          inputStyle="max-w-96"
        />
        <Input
          required
          name="image"
          label="예상 비용 견적서 첨부"
          type="file"
          accept="image/*"
          placeholder="해당 관련 견적서 및 금액을 증빙 할 수 있는 캡쳐본을 첨부해주세요."
        />
        <Input
          name="note"
          label="비고"
          type="text"
          maxChar={300}
          placeholder="내용을 입력해주세요."
        />
      </div>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <h3 className="h2 font-bold text-gray-900">{"지급 계좌 정보"}</h3>
        <Input
          name="bank-account"
          label="지급 계좌"
          type="text"
          placeholder="통장 사본과 동일한 계좌번호를 입력해주세요."
        />
        <Input
          required
          name="image"
          label="통장 사본 첨부"
          type="file"
          accept="image/*"
          placeholder="통장 사본을 첨부해주세요."
        />
      </div>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <RadioButton
          required
          type="checkbox"
          name="check"
          label="상기와 같이 해당 (기업명) (동호회)의 지원금을 요청합니다."
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <Button disabled content="제출하기" />
      </div>
    </form>
  );
}
