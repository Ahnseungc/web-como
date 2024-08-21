"use client";

import { useState } from "react";
import useNavigationGuard from "@/hooks/navigationGuard";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import RadioButton from "@/components/common/RadioButton";
import ImageInput from "@/components/common/ImageInput";

export default function NewSupplyForm() {
  useNavigationGuard();
  const [receiptImages, setReceiptImages] = useState<File[]>([]);
  const [supplyImages, setSupplyImages] = useState<File[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          readOnly
        />
        <Input
          name="author"
          label="담당 동호회 임원"
          type="text"
          value="김오모 / 인사팀 / 대리 / 회장(동호회 직급)"
          readOnly
        />
        <Input
          required
          name="name"
          label="품목 이름"
          type="text"
          maxLength={30}
          placeholder="비품의 이름을 작성해주세요."
        />
        <Input
          required
          name="purpose"
          label="구매 목적"
          type="text"
          maxLength={300}
          placeholder="비품을 구매하게 된 목적을 작성해주세요."
        />
        <Input
          required
          name="price"
          label="구매 비용"
          type="number"
          placeholder="금액을 숫자만 입력해주세요."
          inputStyle="max-w-[350px]"
        />
        <ImageInput
          required
          name="receipt-image"
          label="구매 영수증 첨부"
          caption="구매를 증빙할 수 있는 실물 영수증 사진 및 캡쳐본을 첨부해주세요."
          max={3}
          currentImages={receiptImages}
          setCurrentImages={setReceiptImages}
        />
        <ImageInput
          required
          name="image"
          label="비품 사진"
          caption="비품 사진은 최대 8장까지 첨부할 수 있습니다."
          max={8}
          currentImages={supplyImages}
          setCurrentImages={setSupplyImages}
        />
        <Input
          name="note"
          label="비고"
          type="text"
          maxLength={300}
          placeholder="내용을 입력해주세요."
        />
      </div>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <RadioButton
          required
          type="checkbox"
          name="check"
          label="상기와 같이 해당 (기업명) (동호회) 동호회 대표로서 비품 내역을 증빙합니다."
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <Button disabled={!isChecked} content="제출하기" primary />
      </div>
    </form>
  );
}
