"use client";

import { useForm, FormProvider } from "react-hook-form";
import ClubInfo from "./ClubInfo";
import ActivityInfo from "./ActivityInfo";
import MembershipFee from "./MembershipFee";
import OperationInfo from "./OperationInfo";
import Terms from "./Terms";
import { useAutoSave } from "@/hooks/useAutoSave";
import { AutoSaveRestoreAlert } from "@/components/dashboard/club/result-report/molecules/AutoSaveRestoreAlert";

interface ClubApplyFormProps {
  activeTabId: string;
}

interface ClubApplyFormData {
  // 동호회 정보
  applicantName: string;
  clubName: string;
  clubOneLine: string;
  clubDescription: string;
  clubPurpose: string;
  category: string;

  // 활동 정보
  location: string;
  locationDetail: string;
  latitude: string;
  longitude: string;
  activityDate: Date;
  activityTime: string;
  activityFrequency: string;
  minMembers: string;
  maxMembers: string;

  // 회비 정보
  monthlyFee: string;
  bankbookFile: File[];

  // 운영 정보
  presidentName: string;
  vicePresidentName: string;
  managerName: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  signatureFile: File[];

  // 이용약관
  agreeToTerms: boolean;
}

export default function ClubApplyForm({ activeTabId }: ClubApplyFormProps) {
  const methods = useForm<ClubApplyFormData>({
    defaultValues: {
      applicantName: "",
      clubName: "",
      clubOneLine: "",
      clubDescription: "",
      clubPurpose: "",
      category: "",
      location: "",
      locationDetail: "",
      latitude: "",
      longitude: "",
      activityDate: new Date(),
      activityTime: "",
      activityFrequency: "",
      minMembers: "",
      maxMembers: "",
      monthlyFee: "",
      bankbookFile: [],
      presidentName: "",
      vicePresidentName: "",
      managerName: "",
      startDate: new Date(),
      startTime: "",
      endDate: new Date(),
      endTime: "",
      signatureFile: [],
      agreeToTerms: false,
    },
  });

  const { saveData, clearSavedData } = useAutoSave<ClubApplyFormData>({
    form: methods,
    storageKey: "club-apply-form",
    autoRestore: false,
  });

  const formatDateTime = (date: Date, time: string) => {
    const d = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    d.setHours(hours ?? 0, minutes ?? 0, 0, 0);
    return d.toISOString().slice(0, 16).replace("T", " ");
  };

  const onSubmit = async (data: ClubApplyFormData) => {
    try {
      const requestData = {
        name: data.clubName,
        intro: data.clubOneLine,
        detail: data.clubDescription,
        goal: data.clubPurpose,
        category: data.category,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        minMemberCount: Number(data.minMembers),
        maxMemberCount: Number(data.maxMembers),
        monthlyFee: Number(data.monthlyFee),
        activitySchedule: formatDateTime(data.activityDate, data.activityTime),
        recruitStartDate: formatDateTime(data.startDate, data.startTime),
        recruitEndDate: formatDateTime(data.endDate, data.endTime),
        // TODO: headId, subHeadId, affairs (UserSearch ID 연동 후 추가)
      };

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );

      if (data.bankbookFile?.[0]) {
        formData.append("bank", data.bankbookFile[0]);
      }
      if (data.signatureFile?.[0]) {
        formData.append("signature", data.signatureFile[0]);
      }

      const response = await fetch("/api/v1/club", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("동호회 신청에 실패했습니다.");

      await clearSavedData();
    } catch (error) {
      console.error(error);
    }
  };

  const renderTabContent = () => {
    switch (activeTabId) {
      case "club-info":
        return <ClubInfo />;
      case "activity-info":
        return <ActivityInfo />;
      case "membership-fee":
        return <MembershipFee />;
      case "operation-info":
        return <OperationInfo />;
      case "terms":
        return <Terms />;
      default:
        return <ClubInfo />;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        {renderTabContent()}

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => saveData(methods.getValues())}
            className="px-6 py-4 bg-gray-600 rounded-lg text-gray-0 font-bold text-[20px]"
          >
            임시저장
          </button>
          {activeTabId === "terms" && (
            <button
              type="submit"
              className="px-6 py-4 bg-[#FF6B00] text-gray-0 rounded-lg font-bold text-[20px] animate-fadeIn"
            >
              신청서 제출
            </button>
          )}
        </div>
      </form>
      <AutoSaveRestoreAlert form={methods} storageKey="club-apply-form" excludeFields={["bankbookFile", "signatureFile"]} />
    </FormProvider>
  );
}
