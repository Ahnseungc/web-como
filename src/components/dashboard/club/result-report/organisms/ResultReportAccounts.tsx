"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import Card from "@/components/dashboard/common/Card";
import Button from "@/components/common/Button";
import DatePicker from "@/components/common/DatePicker";
import { CustomLabel } from "@/components/common/CustomLabel";
import DropdownSelect from "@/components/common/DropdownSelect";
import RHFTextInput from "@/components/common/RHF/RHFTextInput";
import { ResultReportSchemaType } from "@/lib/types/schema";
import ImageInput from "../atom/image-input";
import { cn } from "@/lib/utils";

const expenseType = [
  { name: "활정책사업: 인적자원운용", value: "activity" },
  { name: "단위사업: 교직원 복지와 사기진작", value: "welfare" },
  { name: "세부사업: 교직원복지지원", value: "support" },
  { name: "사업 항목: 직장동호회지원", value: "club" },
  { name: "목(240) : 복리후생비", value: "benefit" },
] as const;

const ResultReportAccountsForm = () => {
  const methods = useFormContext<ResultReportSchemaType>();
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "data.expenses",
  });

  // 에러 메시지 가져오기
  const getErrorMessage = (fieldPath: string) => {
    const nameParts = fieldPath.split(".");
    let currentErrors: any = methods.formState.errors;

    for (const part of nameParts) {
      if (currentErrors && currentErrors[part]) {
        currentErrors = currentErrors[part];
      } else {
        return undefined;
      }
    }

    return currentErrors?.message?.toString();
  };

  return (
    <section className="flex flex-col gap-3">
      {fields.map((field, idx) => (
        <Card className="mt-3 border p-4 mb-4 rounded w-full" key={field.id}>
          <header className="flex items-center justify-between">
            <h2 className="h1 font-bold text-black">
              활동 지원비 정산서 {fields.length !== 1 && idx + 1}
            </h2>
            {fields.length !== 1 && (
              <button
                type="button"
                onClick={() => remove(idx)}
                disabled={fields.length <= 1}
                className="px-2 py-1 bg-red-500 text-white rounded disabled:opacity-50"
              >
                삭제
              </button>
            )}
          </header>
          <div className="flex gap-3 w-full h-[60px]">
            <div className="w-1/4 flex flex-col gap-2 h-full">
              <CustomLabel
                htmlFor={`data.expenses.${idx}.category`}
                labelText={"과목"}
                required={true}
              />
              <DropdownSelect
                required
                id={`data-expenses-${idx}-category`}
                width="w-[223.5px]"
                height="h-[47px]"
                placeholder="종류 선택"
                options={[...expenseType]}
                currentValue={
                  methods.watch(`data.expenses.${idx}.category`) || ""
                }
                handleChange={(val) =>
                  methods.setValue(`data.expenses.${idx}.category`, val)
                }
              />
            </div>
            <div className="w-1/4 h-full relative">
              <RHFTextInput
                name={`data.expenses.${idx}.supportAmount`}
                id={`data.expenses.${idx}.supportAmount`}
                labelText="지원액"
                placeholder="지원액을 작성해주세요"
                inputStyle="pr-9 flex-1"
                required
                type="number"
                inputMode="numeric"
              />
              {getErrorMessage(`data.expenses[${idx}].supportAmount`) && (
                <div className="absolute text-base font-medium text-point-red mt-1">
                  {getErrorMessage(`data.expenses[${idx}].supportAmount`)}
                </div>
              )}
            </div>
            <div className="w-1/4">
              <RHFTextInput
                name={`data.expenses.${idx}.usedAmount`}
                id={`data.expenses.${idx}.usedAmount`}
                labelText="집행액"
                placeholder="집행액을 작성해주세요"
                inputStyle="pr-9 flex-1"
                required
                type="number"
                inputMode="numeric"
              />
            </div>
            <div className="w-1/4 h-full">
              <RHFTextInput
                name={`data.expenses.${idx}.remainingAmount`}
                id={`data.expenses.${idx}.remainingAmount`}
                labelText="잔액"
                placeholder="잔액을 작성해주세요"
                inputStyle="pr-9 flex-1"
                required
                type="number"
                inputMode="numeric"
              />
            </div>
          </div>
          <RHFTextInput
            name={`data.expenses.${idx}.usageDetail`}
            id={`data.expenses.${idx}.usageDetail`}
            labelText="주요 활동 내용"
            required
            maxLength={1000}
            rows={6}
          />
          <header className="flex items-center justify-between">
            <h2 className="h1 font-bold text-black">활동 지원비 영수증</h2>
          </header>
          <div className="flex flex-col gap-6 max-w-[350px]">
            <RHFTextInput
              name={`data.expenses.${idx}.submittedBy`}
              id={`data.expenses.${idx}.submittedBy`}
              labelText="담당자"
              required
            />
            <div className="flex flex-col gap-2">
              <CustomLabel
                htmlFor={`data.expenses.${idx}.issuedDate`}
                labelText={"일자"}
                required={true}
              />
              <DatePicker
                id={`data-expenses-${idx}-issuedDate`}
                size="h-[60px]"
                textStyle="h4 font-medium text-gray-900"
                currentDate={methods.watch(`data.expenses.${idx}.issuedDate`)}
                handleDateChange={(newDate) => {
                  methods.setValue(`data.expenses.${idx}.issuedDate`, newDate!);
                }}
              />
            </div>
          </div>
          <div className="flex gap-3 w-full">
            <div className="w-1/3">
              <RHFTextInput
                name={`data.expenses.${idx}.vendor`}
                id={`data.expenses.${idx}.vendor`}
                labelText="사용처"
                placeholder="사용처를 작성해주세요"
                required
              />
            </div>
            <div className="w-1/3">
              <RHFTextInput
                name={`data.expenses.${idx}.amount`}
                id={`data.expenses.${idx}.amount`}
                labelText="금액"
                placeholder="금액을 작성해주세요"
                required
                type="number"
              />
            </div>
            <div className="w-1/3">
              <ImageInput idx={idx} />
            </div>
          </div>
          <RHFTextInput
            name={`data.expenses.${idx}.description`}
            id={`data.expenses.${idx}.description`}
            labelText="내용"
            placeholder="내용을 작성해주세요"
            maxLength={100}
            required
          />
        </Card>
      ))}
      {/* <Card className="mt-3 border p-4 mb-4 rounded w-full"> */}

      <button
        type="button"
        className="!bg-orange-50 !text-orange-500 !border-none flex items-center justify-center w-full h-[60px] rounded-md border transition duration-200"
        onClick={() =>
          append({
            category: "",
            supportAmount: "",
            usedAmount: "",
            remainingAmount: "",
            usageDetail: "",
            submittedBy: "",
            issuedDate: new Date(),
            vendor: "",
            amount: "",
            description: "",
          })
        }
        disabled={fields.length >= 5}
      >
        <span
          className={cn("h3 font-bold transition duration-200 text-orange-500")}
        >
          + 정산서 추가하기
        </span>
      </button>
      {/* </Card> */}
    </section>
  );
};

export default ResultReportAccountsForm;
