"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import DatePicker from "@/components/common/DatePicker";
import Input from "@/components/common/Input";
import RadioButton from "@/components/common/RadioButton";
import ImageInput from "@/components/common/ImageInput";

export default function NewReportForm() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>();

  const handleDateChange = (date: Date | undefined) => {
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
          label="활동 내용"
          type="text"
          maxChar={300}
          placeholder="내용을 입력해주세요."
        />
        <ImageInput
          required
          name="image"
          label="활동 사진"
          caption="활동사진 첨부 필수사항입니다."
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
        <h3 className="h2 font-bold text-gray-900">
          {"활동 지출 내역 및 증빙"}
        </h3>
        <div className="flex flex-col gap-2">
          <span className="h3 font-semibold text-gray-900">{"전표 일자"}</span>
          <DatePicker
            id="receipt-date"
            size="w-[350px] min-h-[60px]"
            textStyle="h4 font-medium"
            currentDate={date}
            handleDateChange={handleDateChange}
          />
        </div>
        <div className="flex gap-4">
          <Input
            name="expense-usage"
            label="사용처"
            type="text"
            placeholder="사용처를 입력해주세요."
          />
          <Input
            name="expense-amount"
            label="금액"
            type="text"
            placeholder="금액을 입력해주세요."
          />
          <Input
            name="expense-content"
            label="내용"
            type="text"
            placeholder="내용을 입력해주세요."
          />
          <Input
            name="expense-receipt"
            label="영수증 첨부"
            type="file"
            accept="image/*"
            placeholder="파일을 첨부해주세요."
          />
        </div>
        <ImageInput
          required
          name="expense-image"
          label="지출 증빙용 활동 사진 첨부"
          caption="활동사진 첨부 필수사항입니다."
        />
      </div>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <RadioButton
          required
          type="checkbox"
          name="check"
          label="상기와 같이 해당 (기업명) (동호회) 동호회 대표로서 동호회 활동 실적을 보고합니다."
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <Button disabled content="제출하기" />
      </div>
    </form>
  );
}
