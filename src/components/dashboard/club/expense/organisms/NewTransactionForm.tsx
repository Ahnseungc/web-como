"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { openModal } from "@/lib/utils";
import Button from "@/components/common/Button";
import Input, { InputLabel } from "@/components/common/Input";
import ImageInput from "@/components/common/ImageInput";
import DropdownSelect from "@/components/common/DropdownSelect";
import Separator from "@/components/common/Separator";

const transactionType = [
  { name: "입금", value: "deposit" },
  { name: "출금", value: "withdrawal" },
] as const;

type TransactionType = (typeof transactionType)[number]["value"];

const expenseType = [
  { name: "활동비 지원", value: "activity" },
  { name: "비품 구매", value: "supply" },
  { name: "우수 동호회 상금", value: "prize" },
  { name: "기타", value: "etc" },
] as const;

type ExpenseType = (typeof expenseType)[number]["value"];

interface FormValues {
  transactionType: TransactionType;
  expenseType?: ExpenseType;
  receiptCode?: string;
  price?: string;
  from?: string;
}

export default function NewTransactionForm() {
  const searchParams = useSearchParams();
  const receiptCode = searchParams.get("receiptCode");
  const [formValues, setFormValues] = useState<FormValues | undefined>(
    receiptCode ? { transactionType: "deposit", receiptCode } : undefined
  );
  const [receiptImages, setReceiptImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal("transaction-submit-success");
  };

  return (
    <form
      className="flex-1 space-y-10 p-8 rounded-xl bg-gray-0"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-6">
        <h2 className="h1 font-bold text-gray-900">{"입출금 내역 작성"}</h2>
        <div className="flex flex-col gap-2">
          <Input
            name="clubInfo"
            label="동호회 정보"
            type="text"
            value="동호회명 : 어푸어푸 수영 동호회"
            readOnly
          />
          <Input
            name="clubInfo2"
            type="text"
            value="회장 : 김오모 / 부회장 : 김오모 / 총무 : 김오모"
            readOnly
          />
        </div>
        <Input
          name="author"
          label="작성자"
          type="text"
          value="송지은 / 경영지원팀 / 대리 / 총무(동호회 직책)"
          readOnly
        />
      </div>
      <Separator />
      <div className="space-y-6">
        <div className="space-y-2">
          <InputLabel label="입/출금" required id="transaction-type" />
          <DropdownSelect
            required
            id="transaction-type"
            placeholder="종류 선택"
            options={[...transactionType]}
            currentValue={formValues?.transactionType || ""}
            handleChange={(newValue) =>
              setFormValues((prev) => {
                return {
                  ...prev,
                  transactionType: newValue as TransactionType,
                };
              })
            }
          />
        </div>
        {formValues ? (
          formValues.transactionType === "deposit" ? (
            <>
              <div className="space-y-2">
                <InputLabel label="비목" required id="expense-type" />
                <DropdownSelect
                  required
                  id="expense-type"
                  placeholder="종류 선택"
                  options={[...expenseType]}
                  currentValue={formValues?.expenseType || ""}
                  handleChange={(newValue) =>
                    setFormValues((prev) => {
                      return {
                        ...prev,
                        transactionType: "deposit",
                        expenseType: newValue as ExpenseType,
                      };
                    })
                  }
                />
              </div>
              <Input
                required
                name="receipt-code"
                label="수령증 코드"
                type="text"
                placeholder="수령증 코드를 입력해주세요"
                inputStyle="max-w-96"
                currentValue={formValues.receiptCode}
                handleInputChange={(e) =>
                  setFormValues((prev) => {
                    return {
                      ...prev,
                      transactionType: "deposit",
                      receiptCode: e.target.value,
                    };
                  })
                }
              />
            </>
          ) : (
            <>
              <Input
                required
                name="price"
                label="사용 금액"
                type="text"
                placeholder="금액을 적어주세요"
                inputStyle="max-w-96"
                currentValue={formValues.price}
                handleInputChange={(e) =>
                  setFormValues((prev) => {
                    return {
                      ...prev,
                      transactionType: "withdrawal",
                      price: e.target.value,
                    };
                  })
                }
              />
              <Input
                required
                name="from"
                label="출금처"
                type="text"
                placeholder="금액을 사용한 곳을 작성해주세요"
                currentValue={formValues.from}
                handleInputChange={(e) =>
                  setFormValues((prev) => {
                    return {
                      ...prev,
                      transactionType: "withdrawal",
                      from: e.target.value,
                    };
                  })
                }
              />
              <ImageInput
                required
                name="receipt-image"
                label="영수증 첨부"
                caption="구매를 증빙할 수 있는 실물 영수증 사진 및 캡쳐본을 첨부해주세요."
                currentImages={receiptImages}
                setCurrentImages={setReceiptImages}
              />
            </>
          )
        ) : (
          <></>
        )}
      </div>
      <Button
        disabled={
          !formValues?.transactionType ||
          (formValues.transactionType === "deposit"
            ? !formValues?.expenseType || !formValues.receiptCode
            : !formValues.price ||
              !formValues.from ||
              receiptImages.length === 0)
        }
        content="입출금 내역 추가하기"
        primary
      />
    </form>
  );
}
