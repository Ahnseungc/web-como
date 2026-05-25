"use client";

import DatePicker from "@/components/common/DatePicker";
import TimeSelect from "@/components/common/TimeSelect";
import UserSearchInput from "@/components/common/UserSearchInput";
import { useFormContext } from "react-hook-form";
import FileUploadField from "@/components/common/FileUploadField";

export default function OperationInfo() {
  const { watch, setValue } = useFormContext();

  const startDate = watch("startDate");
  const startTime = watch("startTime");
  const endDate = watch("endDate");
  const endTime = watch("endTime");

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-[22px] font-bold text-gray-900">
          사내동호회 운영 정보
        </h3>
        <p className="text-[16px] text-gray-400 mt-2 font-medium">
          사내동호회 운영 정보를 입력해주세요.
        </p>
      </div>

      <div className="border-t border-gray-100 pt-10">
        <div className="flex">
          <div className="w-[240px] shrink-0 pt-1">
            <span className="text-[18px] font-bold text-gray-800">
              동호회 운영진
            </span>
          </div>

          <div className="flex-1 space-y-8">
            <UserSearchInput
              name="presidentName"
              label="운영장"
              placeholder="이름을 검색해주세요."
            />
            <UserSearchInput
              name="vicePresidentName"
              label="부운영장"
              placeholder="이름을 검색해주세요."
            />
            <UserSearchInput
              name="managerName"
              label="총무"
              placeholder="이름을 검색해주세요."
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-10">
        <div className="flex">
          <div className="w-[240px] shrink-0 pt-1">
            <span className="text-[18px] font-bold text-gray-800">
              신규 회원 모집 일정 설정
            </span>
          </div>

          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[16px] font-bold text-gray-800">
                <span>신규 회원 모집 시작 일시를 선택해 주세요.</span>
              </div>
              <div className="flex gap-2 max-w-[520px]">
                <DatePicker
                  id="recruitStartDate"
                  size="w-[250px] h-[60px] bg-gray-100 border-none"
                  textStyle="text-[16px] font-medium text-gray-900"
                  currentDate={startDate}
                  handleDateChange={(date) => setValue("startDate", date)}
                  disablePastDates
                />
                <TimeSelect
                  id="recruitStartTime"
                  width="w-[250px]"
                  currentValue={startTime || "시간선택"}
                  handleChange={(time) => setValue("startTime", time)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[16px] font-bold text-gray-800">
                <span>신규 회원 모집 마감 일시를 선택해주세요.</span>
              </div>
              <div className="flex gap-2 max-w-[520px]">
                <DatePicker
                  id="recruitEndDate"
                  size="w-[250px] h-[60px] bg-gray-100 border-none"
                  textStyle="text-[16px] font-medium text-gray-900"
                  currentDate={endDate}
                  handleDateChange={(date) => setValue("endDate", date)}
                  disablePastDates
                />
                <TimeSelect
                  id="recruitEndTime"
                  width="w-[250px]"
                  currentValue={endTime || "시간선택"}
                  handleChange={(time) => setValue("endTime", time)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-10">
        <FileUploadField
          label="담당자 서명 이미지 업로드"
          id="signatureUpload"
          files={watch("signatureFile") || []}
          onFileChange={(files) => setValue("signatureFile", files)}
          onFileRemove={() => setValue("signatureFile", [])}
          placeholder="서명 이미지를 첨부하세요."
        />
      </div>
    </div>
  );
}
