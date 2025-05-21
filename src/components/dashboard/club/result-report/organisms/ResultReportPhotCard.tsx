"use client";

import { Plus, Remove } from "@/assets/icons/action";
import { CustomLabel } from "@/components/common/CustomLabel";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ResultReportSchemaType } from "@/lib/types/schema";

const ResultReportPhotCard = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ResultReportSchemaType>();
  const photos = watch("photos");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setValue("photos", [...(photos || []), ...files].slice(0, 4), {
      shouldValidate: true,
    });
    e.target.value = "";
  };

  const handleRemove = (idx: number) => {
    setValue(
      "photos",
      (photos || []).filter((_: any, i: number) => i !== idx),
      { shouldValidate: true }
    );
  };

  // 에러 메시지 가져오기
  const getErrorMessage = () => {
    const nameParts = "photos".split(".");
    let currentErrors: any = errors;

    for (const part of nameParts) {
      if (currentErrors && currentErrors[part]) {
        currentErrors = currentErrors[part];
      } else {
        return undefined;
      }
    }

    return currentErrors?.message?.toString();
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="flex flex-col gap-2">
      <CustomLabel
        htmlFor="addPhoto"
        labelText="지출 증빙용 활동 사진"
        required={true}
      />
      <div className="relative">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <div className="grid grid-cols-2 gap-3 mt-2 flex-wrap">
          {(photos || []).map((file: File, idx: number) => (
            <div
              key={idx}
              className="relative w-full aspect-square max-w-full max-h-[558px]"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`업로드 미리보기 ${idx + 1}`}
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                aria-label="이미지 삭제"
              >
                <Remove className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="w-[100px] h-[100px] rounded-[8px] flex items-center justify-center bg-gray-900 mt-2"
          onClick={handleButtonClick}
        >
          <Plus className="w-8 h-8 text-gray-50" />
        </button>

        <p className="text-sm text-gray-500">
          활동사진 첨부 필수사항입니다. 최대 4장까지 첨부 가능합니다.
        </p>

        {errorMessage && (
          <div className="absolute text-base font-medium text-point-red mt-1">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultReportPhotCard;
