"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import RadioButton from "@/components/common/RadioButton";
import ImageInput from "@/components/common/ImageInput";
import DropdownSelect from "@/components/common/DropdownSelect";
import { CustomTextarea } from "@/components/common/CustomTextarea";
import { useMutation } from "@tanstack/react-query";
import { format } from "path";
import { File } from "@/assets/icons/info";
import { useToast } from "@/components/common/ToastContainer";
import { AutoSaveRestoreAlert } from "../../result-report/molecules/AutoSaveRestoreAlert";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAutoSave } from "@/hooks/useAutoSave";

const types = [
  { name: "활동비 지원", value: "activity" },
  { name: "비품 구매", value: "supply" },
  { name: "우수 동호회 상금", value: "prize" },
  { name: "기타", value: "etc" },
];

const expenseFormSchema = z.object({
  eventName: z.string().min(1, "행사명을 입력해주세요."),
  description: z.string().min(1, "활동 내용을 입력해주세요."),
  note: z.string().optional(),
  location: z.string().min(1, "장소를 입력해주세요."),
  participantsCount: z.string().min(1, "참여 인원을 입력해주세요."),
  amount: z.string().min(1, "신청 금액을 입력해주세요."),
  details: z.string().min(1, "산출 내역을 입력해주세요."),
});

type ExpenseFormData = z.infer<typeof expenseFormSchema>;

interface Props {
  clubName?: string;
  accessToken: string | undefined;
  clubId: string | undefined;
}

export default function NewExpenseReportForm({
  clubName,
  accessToken,
  clubId,
}: Props) {
  const { replace, refresh } = useRouter();
  const [currentImagesBankAccount, setCurrentImagesBankAccount] = useState<
    File[]
  >([]);
  const { showToast } = useToast();
  const [isChecked, setIsChecked] = useState(false);
  const methods = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    mode: "onChange",
    defaultValues: {
      eventName: "",
      description: "",
      note: "",
      location: "",
      participantsCount: "",
      amount: "",
      details: "",
    },
  });
  const { handleSubmit, watch, setValue } = methods;
  const autoSave = useAutoSave({
    form: methods,
    storageKey: "result-expense-form",
    autoRestore: false,
  });

  // 수동으로 유효성 체크
  const isFormValid =
    watch("eventName") &&
    watch("description") &&
    watch("location") &&
    watch("participantsCount") &&
    watch("amount") &&
    watch("details");

  const onSubmit = (data: ExpenseFormData) => {
    if (!isChecked) {
      showToast("동의해주세요.", "error");
      return;
    }
    mutate(data);
  };

  const { mutate } = useMutation({
    mutationFn: async (data: ExpenseFormData) => {
      try {
        const formData = new FormData();

        const submitData = {
          eventName: data.eventName,
          description: data.description,
          note: data.note,
          participantsCount: Number(data.participantsCount),
          location: data.location,
          amount: Number(data.amount.split(",").join("")),
          details: data.details,
        };
        const JsonData = JSON.stringify(submitData);

        const blob = new Blob([JsonData], { type: "application/json" });
        formData.append("data", blob);

        if (currentImagesBankAccount[0]) {
          formData.append("planFile", currentImagesBankAccount[0]);
        }

        const response = await fetch(
          `/api/server/v1/executive/club/${clubId}/activity-expenses`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        return result;
      } catch (error) {
        console.error("Error during fetch:", error);
        throw error;
      }
    },
    onError: (e) => {
      console.error("Mutation error:", e);
    },
    onSuccess: (data) => {
      if (data.resultCode === "OK") {
        autoSave.clearSavedData();
        showToast(
          "활동비 지급 신청서 (품의서)가 작성 및 담당 부서에게 전달되었습니다.",
          "success"
        );
        refresh();
        replace(`${CLUB_DASHBOARD_ENDPOINT}/expense`);
      }
    },
  });

  const formatAmount = (amount: string) => {
    const numberValue = parseFloat(amount.replace(/,/g, ""));
    if (!isNaN(numberValue)) {
      return numberValue.toLocaleString();
    }
    return amount;
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
          <h3 className="h2 font-bold text-gray-900">{"활동 개요"}</h3>
          <Input
            required
            name="eventName"
            label="행사명"
            type="text"
            value={watch("eventName")}
            placeholder="행사명을 입력하세요."
            handleInputChange={(e) => {
              setValue("eventName", e.target.value);
            }}
          />
          <Input
            required
            name="description"
            label="활동 내용"
            type="text"
            currentValue={watch("description")}
            maxLength={1000}
            placeholder={`(예시)
1. 일시: 2025. 5. 20. (화) 18:00 ~ 20:00
2. 대상: 00 동호회 회원 00명
3. 활동내용: 2025년 5월 정기 연습
- 입문 및 초급자 레슨 00명
- 회원 정기 연습 경기 등
              `}
            handleInputChange={(e) => {
              setValue("description", e.target.value);
            }}
            inputStyle="h-[300px] resize-none whitespace-pre-wrap"
          />

          <Input
            name="note"
            label="주요 내용"
            type="text"
            placeholder="(필요한 경우 추가 작성)"
            maxLength={1000}
            currentValue={watch("note")}
            handleInputChange={(e) => {
              setValue("note", e.target.value);
            }}
            inputStyle="h-[300px] resize-none whitespace-pre-wrap"
          />
        </div>
        <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
          <h3 className="h2 font-bold text-gray-900">{"신청 금액"}</h3>
          <Input
            required
            name="location"
            label="장소(사용처)"
            type="text"
            placeholder="위치를 입력하세요."
            inputStyle="max-w-[350px]"
            value={watch("location")}
            handleInputChange={(e) => {
              setValue("location", e.target.value);
            }}
          />
          <Input
            required
            name="participantsCount"
            label="참여 인원"
            type="number"
            placeholder="인원수를 입력하세요."
            inputStyle="max-w-[350px]"
            value={watch("participantsCount")}
            handleInputChange={(e) => {
              setValue("participantsCount", e.target.value);
            }}
          />
          <Input
            required
            name="amount"
            label="신청 금액"
            type="text"
            placeholder="금액을 입력하세요."
            inputStyle="max-w-[350px]"
            value={formatAmount(watch("amount"))}
            handleInputChange={(e) => {
              setValue("amount", e.target.value);
            }}
          />
          <Input
            required
            name="details"
            label="산출 내역"
            type="text"
            placeholder={`(예시)
1. 라켓 구입: 000원*00개=000원
2. 공 구입: 000원*00개=000원`}
            maxLength={1000}
            currentValue={watch("details")}
            handleInputChange={(e) => {
              setValue("details", e.target.value);
            }}
            inputStyle="h-[300px] resize-none whitespace-pre-wrap"
          />
          <div className="flex flex-col gap-2">
            <span className="h3 font-semibold text-gray-900">
              행사 계획서 첨부
            </span>
            <label
              htmlFor="fileUpload"
              className="py-[18px] px-[20px] bg-gray-100 max-w-[350px] max-h-[60px] text-gray-400 flex items-center justify-between cursor-pointer"
            >
              {currentImagesBankAccount.length > 0 ? (
                <span className=" truncate">
                  {currentImagesBankAccount[0].name}
                </span>
              ) : (
                "계획서 파일을 첨부하세요."
              )}

              <input
                type="file"
                accept=".hwp, .doc, .docx"
                className="hidden"
                id="fileUpload"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const fileArray = Array.from(e.target.files);
                    setCurrentImagesBankAccount(fileArray);
                  }
                }}
              />
              <File />
            </label>
          </div>
        </div>
        {isFormValid && (
          <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
            <RadioButton
              required
              type="checkbox"
              name="isChecked"
              label={`상기와 같이 해당 ${clubName}의 지원금을 요청합니다.`}
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <Button disabled={!isChecked} content="제출하기" primary />
          </div>
        )}
        <AutoSaveRestoreAlert form={methods} storageKey="result-expense-form" />
      </form>
    </FormProvider>
  );
}
