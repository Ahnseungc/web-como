"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import DatePicker from "@/components/common/DatePicker";
import Input from "@/components/common/Input";
import RadioButton from "@/components/common/RadioButton";
import EditIcon from "@/assets/icons/edit.svg";

const image = null;

export default function ReportWriteTab() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  return (
    <form className="flex gap-3">
      <div className="space-y-6">
        <div className="space-y-6 p-5 rounded-xl bg-gray-0">
          <div className="flex items-center justify-between">
            <h3 className="h2 font-bold text-gray-900">{"대표 이미지"}</h3>
            <Image
              src={EditIcon}
              alt="편집"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
          <div className="w-[350px] h-[342px] rounded-lg bg-gray-300">
            {image && (
              <Image
                src={image}
                alt="대표 이미지"
                fill
                priority
                sizes="(max-width: 800px) 50vw, (max-width: 1000px) 40vw, (max-width: 1500px) 33vw, 20vw"
                className="rounded-lg"
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-4 rounded-md text-center h3 font-bold text-gray-50 bg-gray-900"
        >
          {"저장하기"}
        </button>
      </div>
      <div className="space-y-3 w-full">
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
          <Input
            required
            name="image"
            label="활동 사진"
            type="file"
            accept="image/*"
            placeholder="파일을 첨부해주세요."
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
            <span className="h3 font-semibold text-gray-900">
              {"전표 일자"}
            </span>
            <DatePicker
              size="w-[350px] min-h-[60px]"
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
          <Input
            required
            name="expense-image"
            label="지출 증빙용 활동 사진 첨부"
            type="file"
            accept="image/*"
            placeholder="파일을 첨부해주세요."
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
      </div>
    </form>
  );
}
