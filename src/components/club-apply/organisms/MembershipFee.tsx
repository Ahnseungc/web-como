"use client";

import { useFormContext } from "react-hook-form";
import { CustomTextarea } from "@/components/common/CustomTextarea";
import FileUploadField from "@/components/common/FileUploadField";

export default function MembershipFee() {
  const { register, watch, setValue } = useFormContext();

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-[20px] font-bold text-gray-900">사내동호회 회비</h3>
        <p className="text-[16px] text-gray-400 mt-2 font-medium">
          사내동호회 운영 시 회비 정보를 입력해주세요.
        </p>
      </div>

      {/* 월 동호회 회비 입력 섹션 */}
      <div className="border-t border-gray-100 pt-8">
        <div className="flex">
          <label className="w-[240px] shrink-0 text-[18px] font-bold text-gray-800 pt-4">
            월 동호회 회비
          </label>

          <div className="flex-1 space-y-4">
            <div className="relative">
              <CustomTextarea
                {...register("monthlyFee")}
                id="monthlyFee"
                placeholder="예시) 100,000원"
                className="pr-12 py-5 text-[16px]"
              />
            </div>

            {/* 회비 안내 문구 */}
            <div className="text-[16px] leading-relaxed text-gray-600 font-medium">
              <p className="mb-1">
                *사내동호회 월 동호회 회비 안내 (기준 미달일 시 반려사유가 될 수
                있습니다)
              </p>
              <ul className="space-y-1 ml-1">
                <li>• 회원 수 10명 이상의 동호회 기준: 100,000원</li>
                <li>• 회원 수 15명 이상의 동호회 기준: 150,000원</li>
                <li>• 회원 수 20명 이상의 동호회 기준: 200,000원</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 회비 관리 통장사본 섹션 */}
      <div className="border-t border-gray-100 pt-10">
        <FileUploadField
          label="회비 관리 통장사본"
          id="bankbookUpload"
          files={watch("bankbookFile") || []}
          onFileChange={(files) => setValue("bankbookFile", files)}
          onFileRemove={() => setValue("bankbookFile", [])}
          placeholder="통장사본 파일을 첨부하세요."
        />
      </div>
    </div>
  );
}
