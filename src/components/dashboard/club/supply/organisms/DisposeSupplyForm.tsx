"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useNavigationGuard from "@/hooks/navigationGuard";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import RadioButton from "@/components/common/RadioButton";
import ImageInput from "@/components/common/ImageInput";

export default function DisposeSupplyForm() {
  useNavigationGuard();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [formValue, setFormValue] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("폐기 사유: " + formValue);
    replace(pathname.split("/dispose")[0]);
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
          label="담당 동호회 임원"
          type="text"
          value="김오모 / 인사팀 / 대리 / 회장(동호회 직급)"
          readonly
        />
        <Input
          name="name"
          label="품목 이름"
          type="text"
          readonly
          value="빔프로젝터"
        />
        <Input
          name="purpose"
          label="구매 목적"
          type="text"
          readonly
          value="PT시 필요자료 띄우기"
        />
        <Input
          name="price"
          label="구매 비용"
          type="text"
          inputStyle="max-w-[350px]"
          readonly
          value="319,000원"
        />
        <ImageInput
          name="receipt-image"
          label="구매 영수증 첨부"
          readonly
          currentImages={[]}
        />
        <ImageInput
          name="image"
          label="비품 사진"
          readonly
          currentImages={[]}
        />
        <Input name="note" label="비고" type="text" readonly />
      </div>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <h3 className="h2 font-bold text-gray-900">{"폐기 사유"}</h3>
        <Input
          name="personInCharge"
          label="폐기 담당 동호회 임원"
          type="text"
          value="김오모 / 인사팀 / 대리 / 회장(동호회 직급)"
          readonly
        />
        <Input
          required
          name="reason"
          label="폐기 사유"
          type="text"
          maxChar={300}
          placeholder="비품을 폐기하게 된 사유를 작성해 주세요."
          currentValue={formValue}
          handleInputChange={(e) => setFormValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <RadioButton
          required
          type="checkbox"
          name="check"
          label="상기와 같이 해당 (기업명) (동호회) 동호회 대표로서 비품 폐기 사실을 증빙합니다."
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <Button
          disabled={!isChecked || !formValue}
          content="제출하기"
          primary
        />
      </div>
    </form>
  );
}
