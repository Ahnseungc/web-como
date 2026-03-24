"use client";

import { useState, useEffect } from "react";
import { useAutoSave } from "@/hooks/useAutoSave";
import { UseFormReturn } from "react-hook-form";
import { useToast } from "@/components/common/ToastContainer";

interface Props {
  form: UseFormReturn<any>;
  storageKey: string;
}

export const AutoSaveRestoreAlert = ({ form, storageKey }: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [savedData, setSavedData] = useState<any>(null);
  const { showToast } = useToast();
  const { restoreData, clearSavedData } = useAutoSave({
    form,
    storageKey,
    enabled: true,
    autoRestore: false,
  });

  useEffect(() => {
    const checkForSavedData = async () => {
      const data = await restoreData();

      if (data) {
        setSavedData(data);
        setShowAlert(true);
      } else {
        console.log("No saved data found");
      }
    };

    checkForSavedData();
  }, [restoreData]);

  const handleRestore = async () => {
    if (savedData) {
      try {
        // 폼에 데이터 복원 (파일 필드 제외)
        Object.keys(savedData).forEach((fieldKey) => {
          if (savedData[fieldKey] !== undefined) {
            // photos와 receipts는 파일 배열이므로 복원하지 않음
            if (fieldKey !== "photos" && fieldKey !== "receipts") {
              form.setValue(fieldKey as any, savedData[fieldKey], {
                shouldValidate: false,
                shouldDirty: false,
              });
            }
          }
        });

        setShowAlert(false);
        showToast("저장된 데이터가 복원되었습니다.", "success");
        form.trigger();
      } catch (error) {
        console.error("Restore error:", error);
        showToast("데이터 복원에 실패했습니다.", "error");
      }
    }
  };

  const handleDismiss = async () => {
    setShowAlert(false);
    try {
      await clearSavedData();
    } catch (error) {
      console.error("Failed to clear saved data:", error);
    }
  };

  if (!showAlert) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] bg-[#ffffff] border border-[#FD7E2D] rounded-2xl p-8 shadow-xl max-w-lg backdrop-blur-sm">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-sm">
          저장된 데이터가 있습니다
        </h3>

        <p className="text-lg text-white/95 mb-6 leading-relaxed drop-shadow-sm">
          이전에 작성 중이던 내용을 복원하시겠습니까?
        </p>

        <div className="flex gap-4 w-full">
          <button
            onClick={handleDismiss}
            className="flex-1 font-bold text-xl text-[#ffffff] bg-[#FD7E2D] py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            무시하기
          </button>
          <button
            onClick={handleRestore}
            className="flex-1 text-xl font-bold bg-white text-[#FD7E2D] py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            복원하기
          </button>
        </div>
      </div>
    </div>
  );
};
