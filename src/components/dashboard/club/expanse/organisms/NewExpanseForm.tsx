"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import RadioButton from "@/components/common/RadioButton";
import ImageInput from "@/components/common/ImageInput";
import DropdownSelect from "@/components/common/DropdownSelect";

const types = [
  { name: "활동비 지원", value: "activity" },
  { name: "비품 구매", value: "supply" },
  { name: "우수 동호회 상금", value: "prize" },
  { name: "기타", value: "etc" },
];

export default function NewExpanseReportForm() {
  const { replace } = useRouter();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [formValues, setFormValues] = useState({ type: "" });
  const [currentImages, setCurrentImages] = useState<File[]>([]);
  const [currentImagesBankAccount, setCurrentImagesBankAccount] = useState<
    File[]
  >([]);

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "활동비 지급 신청서 (품의서)가 작성 및 담당 부서에게 전달되었습니다."
    );
    replace(`${CLUB_DASHBOARD_ENDPOINT}/expanse`);
  };

  return (
    <form className="space-y-3 w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <h3 className="h2 font-bold text-gray-900">{"기본 정보"}</h3>
        <Input
          name="clubName"
          label="동호회명"
          type="text"
          value="산악동호회"
          readonly
        />
        <Input
          name="author"
          label="작성자"
          type="text"
          value="송지은 / 경영지원팀 / 대리 / 총무(동호회 직책)"
          readonly
        />
        <div className="flex flex-col gap-2">
          <span className="h3 font-semibold text-gray-900">{"비목"}</span>
          <DropdownSelect
            required
            id="type"
            placeholder="비목 선택"
            options={types}
            currentValue={formValues.type}
            handleChange={(newValue) =>
              setFormValues((prev) => {
                return { ...prev, type: newValue };
              })
            }
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
        <ImageInput
          required
          name="estimate-image"
          label="예상 비용 견적서 첨부"
          caption="해당 관련 견적서 및 금액을 증빙 할 수 있는 캡쳐본을 첨부해주세요."
          currentImages={currentImages}
          setCurrentImages={setCurrentImages}
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
        <ImageInput
          required
          name="bank-image"
          label="통장 사본 첨부"
          caption="통장 사본을 첨부해주세요."
		  currentImages={currentImagesBankAccount}
		  setCurrentImages={setCurrentImagesBankAccount}
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
        <Button disabled={!isChecked} content="제출하기" primary />
      </div>
    </form>
  );
}
