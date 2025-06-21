"use client";
import RHFTextInput from "@/components/common/RHF/RHFTextInput";
import {
  ScheduleRegisterSchema,
  ScheduleRegisterSchemaType,
} from "@/lib/types/schema";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import ScheduleDetailDate from "../molecues/ScheduleDetail/ScheduleDetailDate";
import ScheduleDetailGeo from "../molecues/ScheduleDetail/ScheduleDetailGeo";
import Button from "@/components/common/Button";
import { ScheduleDetailCardInitialData } from "../molecues/ScheduleDetail/ScheduleDetailCard";
import { getAccessToken, getClubId } from "@/lib/cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ScheduleDetailPeriod from "../molecues/ScheduleDetail/ScheduleDetailPeriod";
import { useToast } from "@/components/common/ToastContainer";

interface ScheduleDetailFormProps {
  type: "REGISTER" | "DETAIL" | "EDIT" | "MEMBERS";
  initialData?: ScheduleDetailCardInitialData;
  scheduleId?: number;
}

const ScheduleDetailForm = ({
  type,
  initialData,
  scheduleId,
}: ScheduleDetailFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (sessionStorage.getItem("refresh-on-back") === "true") {
      sessionStorage.removeItem("refresh-on-back");
      router.refresh();
    }
  }, [isSubmitting, router, type, scheduleId]);

  const methods = useForm<ScheduleRegisterSchemaType>({
    resolver: zodResolver(ScheduleRegisterSchema),
    defaultValues:
      type !== "REGISTER"
        ? {
            title: initialData?.title,
            description: initialData?.detail,
            location: {
              roadAddress: initialData?.location,
              placeName: initialData?.addressDetail,
            },
            date: initialData?.date ? new Date(initialData?.date) : new Date(),
            time: initialData?.time,
            recruitStartDate: initialData?.recruitStartDate,
            recruitEndDate: initialData?.recruitEndDate,
          }
        : {
            title: "",
            description: "",
            location: {
              roadAddress: "",
              placeName: "",
            },
            date: new Date(),
            time: (() => {
              const now = new Date();
              const minutes = now.getMinutes();
              const roundedMinutes = Math.round(minutes / 30) * 30;
              now.setMinutes(roundedMinutes);
              return now.toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
            })(),
            recruitStartDate: new Date().toISOString(),
            recruitEndDate: new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000
            ).toISOString(),
          },
    mode: type !== "DETAIL" ? "onChange" : "onSubmit",
  });

  const debouncedSubmit = useCallback(
    async (data: ScheduleRegisterSchemaType) => {
      if (isSubmitting) return;

      try {
        setIsSubmitting(true);

        if (type === "REGISTER") {
          try {
            const token = await getAccessToken();
            const clubId = await getClubId();
            const response = await fetch(
              `/api/server/v1/executive/club/${clubId}/schedule`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                  title: data.title,
                  recruitStartDate: formatDate(
                    new Date(data.recruitStartDate),
                    "yyyy-MM-dd"
                  ),
                  recruitEndDate: formatDate(
                    new Date(data.recruitEndDate),
                    "yyyy-MM-dd"
                  ),
                  detail: data.description,
                  location: `${data.location.roadAddress} ${data.location.placeName}`,
                  addressDetail: data.location.placeName,
                  date: formatDate(data.date, "yyyy-MM-dd"),
                  time: data.time,
                  latitude: data.location.latitude
                    ? data.location.latitude / 1e7
                    : 0,
                  longitude: data.location.longitude
                    ? data.location.longitude / 1e7
                    : 0,
                }),
              }
            );

            if (!response.ok) {
              throw new Error("일정 등록에 실패했습니다.");
            }

            sessionStorage.setItem("refresh-on-back", "true");
            showToast("일정이 등록되었습니다.", "success");
            router.replace(`/club/dashboard/manage/schedule`);
          } catch (error) {
            console.error("일정 처리 실패:", error);
            showToast("일정 등록에 실패했습니다.", "error");
          }
        }
        if (type === "EDIT") {
          try {
            const token = await getAccessToken();
            const clubId = await getClubId();

            const response = await fetch(
              `/api/server/v1/executive/club/${clubId}/schedule/${scheduleId}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                  title: data.title,
                  recruitStartDate: formatDate(
                    new Date(data.recruitStartDate),
                    "yyyy-MM-dd"
                  ),
                  recruitEndDate: formatDate(
                    new Date(data.recruitEndDate),
                    "yyyy-MM-dd"
                  ),
                  detail: data.description,
                  location: `${data.location.roadAddress} ${data.location.placeName}`,
                  addressDetail: data.location.placeName,
                  date: formatDate(data.date, "yyyy-MM-dd"),
                  time: data.time,
                  latitude: data.location.latitude
                    ? data.location.latitude / 1e7
                    : 0,
                  longitude: data.location.longitude
                    ? data.location.longitude / 1e7
                    : 0,
                }),
              }
            );

            if (!response.ok) {
              showToast("일정 수정에 실패했습니다.", "error");
              throw new Error("일정 수정에 실패했습니다.");
            }
            sessionStorage.setItem("refresh-on-back", "true");
            showToast("일정이 수정되었습니다.", "success");
            router.replace(`/club/dashboard/manage/schedule`);
          } catch (error) {
            console.error("일정 수정 실패:", error);
            showToast("일정 수정에 실패했습니다.", "error");
          }
        }
      } catch (error) {
        console.error("일정 처리 실패:", error);
        showToast("일정 처리에 실패했습니다.", "error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [type, scheduleId, router, isSubmitting, showToast]
  );

  const onSubmit = async (data: ScheduleRegisterSchemaType) => {
    await debouncedSubmit(data);
  };

  const onError = (errors: FieldErrors<ScheduleRegisterSchemaType>) => {
    const errorMessages = Object.entries(errors).map(([field, error]) => {
      return `${field}: ${error.message}`;
    });

    if (type === "REGISTER") {
      console.error("Form validation errors:", errorMessages);
    } else {
      console.error("Form validation errors:", errorMessages);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        <section className="w-full flex flex-col gap-6">
          <RHFTextInput<ScheduleRegisterSchemaType>
            name="title"
            id="title"
            labelText="제목"
            autoComplete="off"
            inputStyle="pr-9"
            required
            readOnly={type === "DETAIL"}
            maxLength={30}
          />
          <RHFTextInput<ScheduleRegisterSchemaType>
            name="description"
            id="description"
            labelText="설명"
            autoComplete="off"
            inputStyle="pr-9"
            readOnly={type === "DETAIL"}
            required
            maxLength={300}
            rows={4}
          />
          <ScheduleDetailPeriod type={type} />
          <ScheduleDetailDate type={type} />
          <ScheduleDetailGeo type={type} />
        </section>
        {type !== "DETAIL" && (
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              content="취소"
              onClick={async () => {
                await router.back();
                router.refresh();
              }}
            />
            <Button
              type="submit"
              primary
              content={type === "REGISTER" ? "등록하기" : "수정하기"}
              disabled={isSubmitting}
            />
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default ScheduleDetailForm;
