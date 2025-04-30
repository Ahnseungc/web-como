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

interface ScheduleDetailFormProps {
  type: "REGISTER" | "DETAIL";
  initialData?: ScheduleDetailCardInitialData;
}

const ScheduleDetailForm = ({ type, initialData }: ScheduleDetailFormProps) => {
  const methods = useForm<ScheduleRegisterSchemaType>({
    resolver: zodResolver(ScheduleRegisterSchema),
    defaultValues:
      type === "DETAIL"
        ? {
            title: initialData?.title,
            description: initialData?.detail,
            location: {
              roadAddress: initialData?.location,
              placeName: "",
            },
            date: initialData?.date ? new Date(initialData?.date) : new Date(),
            time: initialData?.time,
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
          },
    mode: type === "REGISTER" ? "onChange" : "onSubmit",
  });

  const onSubmit = async (data: ScheduleRegisterSchemaType) => {
    try {
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
                detail: data.description,
                location: `${data.location.roadAddress} ${data.location.placeName}`,
                date: data.date,
                time: data.time,
                latitude: "",
                longitude: "",
                maxMember: 10,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("일정 등록에 실패했습니다.");
          }

          window.history.back();
        } catch (error) {
          console.error("일정 처리 실패:", error);
        }
      }
    } catch (error) {
      console.error("일정 처리 실패:", error);
    }
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
          <ScheduleDetailDate type={type} />
          <ScheduleDetailGeo type={type} />
        </section>
        {type === "REGISTER" && (
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              content="취소"
              onClick={() => window.history.back()}
            />
            <Button type="submit" primary content={"등록하기"} />
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default ScheduleDetailForm;
