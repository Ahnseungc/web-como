"use client";

import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import ResultReportAccountsForm from "./ResultReportAccounts";
import ResultReportForm from "./ResultReportForm";
import ResultReportSubmitCard from "./ResultReportSubmitCard";
import { ResultReportSchema, ResultReportSchemaType } from "@/lib/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAccessToken, getClubId } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

const ResultReportFormProvider = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<ResultReportSchemaType>({
    resolver: zodResolver(ResultReportSchema),
    mode: "all",
    defaultValues: {
      data: {
        eventName: "",
        activityDate: new Date(),
        activityTime: "",
        location: "",
        locationDetail: "",
        participantCount: 0,
        activityContent: "",
        note: "",
        expenses: [
          {
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
          },
        ],
      },
      photos: [],
      receipts: [],
    },
  });

  const debouncedSubmit = useCallback(
    async (data: ResultReportSchemaType) => {
      if (isSubmitting) return;

      try {
        setIsSubmitting(true);

        const submitData = {
          ...data,
          data: {
            ...data.data,
            activityDate: data.data.activityDate
              ? formatDateToString(data.data.activityDate)
              : "",
            expenses: data.data.expenses.map((expense) => ({
              ...expense,
              supportAmount: Number(expense.supportAmount),
              usedAmount: Number(expense.usedAmount),
              remainingAmount: Number(expense.remainingAmount),
              amount: Number(expense.amount),
              issuedDate: expense.issuedDate
                ? formatDateToString(expense.issuedDate)
                : "",
            })),
          },
        };

        const formData = new FormData();
        formData.append(
          "data",
          new Blob([JSON.stringify(submitData.data)], {
            type: "application/json",
          })
        );

        (data.photos || []).forEach((file: File) => {
          formData.append("photos", file);
        });
        (data.receipts || []).forEach((file: File) => {
          formData.append("receipts", file);
        });

        const token = await getAccessToken();
        const clubId = await getClubId();

        const response = await fetch(
          `/api/server/v1/executive/club/${clubId}/reports`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("활동 보고서 작성에 실패했습니다.");
        }
        alert("활동 보고서 작성에 성공했습니다.");
        methods.reset();
        router.back();
      } catch (error) {
        alert("활동 보고서 작성에 실패했습니다.");
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, router, methods]
  );

  const onSubmit = async (data: ResultReportSchemaType) => {
    await debouncedSubmit(data);
  };

  const onError = (errors: FieldErrors<ResultReportSchemaType>) => {
    console.log(errors);
  };

  useEffect(() => {
    methods.trigger(); // 모든 필드에 대해 유효성 검사 실행
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <article className="flex-1 flex flex-col gap-3">
          <ResultReportForm />
          <ResultReportAccountsForm />
          <ResultReportSubmitCard isSubmitting={isSubmitting} />
        </article>
      </form>
    </FormProvider>
  );
};

export default ResultReportFormProvider;

function formatDateToString(date: Date | string) {
  if (typeof date === "string") return date;

  // 'en-CA' 로케일은 'YYYY-MM-DD' 형식을 보장합니다.
  return date.toLocaleDateString("en-CA"); // 'en-CA'는 'YYYY-MM-DD' 형식
}
