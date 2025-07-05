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
import { useToast } from "@/components/common/ToastContainer";
import { useAutoSave } from "@/hooks/useAutoSave";
import { AutoSaveRestoreAlert } from "../molecules/AutoSaveRestoreAlert";

function formatDateToString(date: Date | string) {
  if (typeof date === "string") return date;

  return date.toLocaleDateString("en-CA");
}

const ResultReportFormProvider = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const methods = useForm<ResultReportSchemaType>({
    resolver: zodResolver(ResultReportSchema),
    mode: "all",
    defaultValues: {
      data: {
        eventName: "",
        activityDate: new Date(),
        activityTime: "00:00",
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

  useEffect(() => {
    methods.trigger();
  }, [methods]);

  const { clearSavedData } = useAutoSave({
    form: methods,
    storageKey: "result-report-form",
    debounceMs: 2000,
    enabled: true,
    autoRestore: false,
  });

  const debouncedSubmit = useCallback(
    async (data: ResultReportSchemaType) => {
      if (isSubmitting) return;
      methods.trigger();

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
        await clearSavedData();
        showToast("활동 보고서 작성에 성공했습니다.", "success");

        methods.reset();
        router.back();
      } catch (error) {
        showToast("활동 보고서 작성에 실패했습니다.", "error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, router, methods, clearSavedData, showToast]
  );

  const onSubmit = async (data: ResultReportSchemaType) => {
    await debouncedSubmit(data);
  };

  const onError = (errors: FieldErrors<ResultReportSchemaType>) => {
    console.log(errors);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <article className="flex-1 flex flex-col gap-3">
          <ResultReportForm />
          <ResultReportAccountsForm />
          <ResultReportSubmitCard isSubmitting={isSubmitting} />
        </article>
      </form>
      <AutoSaveRestoreAlert form={methods} storageKey="result-report-form" />
    </FormProvider>
  );
};

export default ResultReportFormProvider;
