"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import ClubInfo from "./ClubInfo";
import ActivityInfo from "./ActivityInfo";
import MembershipFee from "./MembershipFee";
import OperationInfo from "./OperationInfo";
import Terms from "./Terms";
import { useAutoSave } from "@/hooks/useAutoSave";
import { AutoSaveRestoreAlert } from "@/components/dashboard/club/result-report/molecules/AutoSaveRestoreAlert";
import { createClub } from "@/api/actions/club/createClub";
import { useToast } from "@/components/common/ToastContainer";

const TAB_ORDER = [
  "club-info",
  "activity-info",
  "membership-fee",
  "operation-info",
  "terms",
] as const;

const TAB_REQUIRED_FIELDS: Record<string, (keyof ClubApplyFormData)[]> = {
  "club-info": [
    "applicantName",
    "clubName",
    "category",
    "clubOneLine",
    "clubDescription",
    "clubPurpose",
  ],
  "activity-info": ["location", "activityTime", "minMembers", "maxMembers"],
  "membership-fee": ["monthlyFee"],
  "operation-info": ["presidentName", "startTime", "endTime"],
  "terms": ["agreeToTerms"],
};

interface ClubApplyFormProps {
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onUnlockNext: () => void;
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

  // 동호회 썸네일
  thumbnailFile: File[];

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

export default function ClubApplyForm({
  activeTabId,
  onTabChange,
  onUnlockNext,
}: ClubApplyFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
      activityDate: new Date(new Date().setHours(0, 0, 0, 0)),
      activityTime: "",
      activityFrequency: "",
      minMembers: "",
      maxMembers: "",
      thumbnailFile: [],
      monthlyFee: "",
      bankbookFile: [],
      presidentName: "",
      vicePresidentName: "",
      managerName: "",
      startDate: new Date(new Date().setHours(0, 0, 0, 0)),
      startTime: "",
      endDate: new Date(new Date().setHours(0, 0, 0, 0)),
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

  useEffect(() => {
    setSubmitError(null);
  }, [activeTabId]);

  const handleNextTab = () => {
    const currentIndex = TAB_ORDER.indexOf(
      activeTabId as (typeof TAB_ORDER)[number]
    );
    const requiredFields = TAB_REQUIRED_FIELDS[activeTabId] ?? [];
    const values = methods.getValues();

    const isEmpty = (val: unknown): boolean => {
      if (val === null || val === undefined || val === false) return true;
      if (typeof val === "string") return val.trim() === "";
      if (Array.isArray(val)) return val.length === 0;
      return false;
    };

    const hasEmpty = requiredFields.some((field) => isEmpty(values[field]));

    if (hasEmpty) {
      showToast("항목을 모두 입력해주세요.", "error");
      return;
    }

    setSubmitError(null);
    onUnlockNext();
    onTabChange(TAB_ORDER[currentIndex + 1]);
  };

  const formatDateTime = (date: Date, time: string) => {
    const d = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    d.setHours(hours ?? 0, minutes ?? 0, 0, 0);
    return d.toISOString().slice(0, 16).replace("T", " ");
  };

  const onSubmit = async (data: ClubApplyFormData) => {
    if (
      data.minMembers &&
      data.maxMembers &&
      Number(data.minMembers) > Number(data.maxMembers)
    ) {
      setSubmitError("최소 인원은 최대 인원보다 클 수 없습니다.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        name: data.clubName,
        intro: data.clubOneLine,
        longitude: data.longitude,
        latitude: data.latitude,
        location: [data.location, data.locationDetail]
          .filter(Boolean)
          .join(" "),
        activityPlan: "",
        goal: data.clubPurpose,
        headId: 1,
        subHeadId: null,
        affairs: null,
        category: data.category,
        maxMemberCount: Number(data.maxMembers) || 0,
        minMemberCount: Number(data.minMembers) || 0,
        duesPerYear: 0,
        detail: data.clubDescription,
        calculationBasis: "",
        businessItem: "",
        activitySchedule:
          data.activityDate && data.activityTime
            ? formatDateTime(data.activityDate, data.activityTime)
            : "",
        memberDescription: "",
        monthlyFee: Number(data.monthlyFee) || 0,
        recruitStartDate:
          data.startDate && data.startTime
            ? formatDateTime(data.startDate, data.startTime)
            : "",
        recruitEndDate:
          data.endDate && data.endTime
            ? formatDateTime(data.endDate, data.endTime)
            : "",
      };

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );
      if (data.bankbookFile?.[0]) formData.append("bank", data.bankbookFile[0]);
      if (data.signatureFile?.[0])
        formData.append("signature", data.signatureFile[0]);
      if (data.thumbnailFile?.[0])
        formData.append("thumbnail", data.thumbnailFile[0]);

      await createClub(formData);

      await clearSavedData();
      alert("동호회 신청이 완료되었습니다.");
      router.push("/login");
    } catch (error) {
      console.error(error);
      setSubmitError(
        error instanceof Error ? error.message : "동호회 신청에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
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

        {submitError && (
          <p className="text-red-500 text-sm text-right">{submitError}</p>
        )}

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={async () => {
              try {
                await saveData(methods.getValues());
                showToast("임시저장이 완료되었습니다.", "success");
              } catch (error) {
                console.error(error);
                showToast("임시저장에 실패했습니다.", "error");
              }
            }}
            className="px-6 py-4 bg-gray-600 rounded-lg text-gray-0 font-bold text-[20px]"
          >
            임시저장
          </button>
          {activeTabId === "terms" ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-4 bg-[#FF6B00] text-gray-0 rounded-lg font-bold text-[20px] animate-fadeIn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "제출 중..." : "신청서 제출"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextTab}
              className="px-6 py-4 bg-[#FF6B00] text-gray-0 rounded-lg font-bold text-[20px]"
            >
              다음
            </button>
          )}
        </div>
      </form>
      <AutoSaveRestoreAlert
        form={methods}
        storageKey="club-apply-form"
        excludeFields={["bankbookFile", "signatureFile"]}
      />
    </FormProvider>
  );
}
