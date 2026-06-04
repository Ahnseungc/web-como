"use client";

import { useFormContext } from "react-hook-form";
import { CustomTextarea } from "@/components/common/CustomTextarea";
import Input from "@/components/common/Input";
import UserSearchInput from "@/components/common/UserSearchInput";
import CustomSelect from "@/components/common/CustomSelect";
import FileUploadField from "@/components/common/FileUploadField";
import { CATEGORY_OPTIONS } from "@/lib/constants/category";

export default function ClubInfo() {
  const { register, watch, setValue } = useFormContext();

  const clubDescription = watch("clubDescription", "");
  const clubPurpose = watch("clubPurpose", "");
  const category = watch("category", "");

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-[20px] font-bold text-gray-900">사내동호회 정보</h3>
        <p className="text-[16px] text-gray-400 mt-2 font-medium">
          운영하고 싶은 사내동호회 정보를 입력해주세요.
        </p>
      </div>

      <div className="flex py-8">
        <label className="w-[240px] shrink-0 text-[18px] font-bold text-gray-800 pt-3">
          신청인
        </label>
        <div className="flex-1 space-y-2">
          <UserSearchInput
            name="applicantName"
            idField="applicantId"
            departmentField="applicantDepartment"
            placeholder="이름을 검색해주세요."
          />
          <p className="text-[16px] text-gray-500 font-medium">
            코모 어플에서 가입 후 신청해주세요.
          </p>
        </div>
      </div>

      <div className="flex py-8">
        <label className="w-[240px] shrink-0 text-[18px] font-bold text-gray-800 pt-3">
          동호회 이름
        </label>
        <div className="flex-1 space-y-2">
          <div className="relative">
            <Input
              name="clubName"
              placeholder="예시) 즐거운 산악회"
              inputStyle="w-full bg-gray-100 border-none py-4 pr-12"
              maxLength={10}
              value={watch("clubName")}
              handleInputChange={(e) => {
                setValue("clubName", e.target.value);
              }}
            />
          </div>
          <p className="text-[16px] text-gray-500 font-medium">
            10자 이하로 입력해주세요. 콤마(,) 및 기호 사용 불가
          </p>
        </div>
      </div>

      <div className="flex py-8">
        <label className="w-[240px] shrink-0 text-[18px] font-bold text-gray-800 pt-3">
          카테고리
        </label>
        <div className="flex-1">
          <CustomSelect
            options={CATEGORY_OPTIONS}
            currentValue={category}
            handleChange={(val) => setValue("category", val)}
            placeholder="카테고리를 선택해주세요."
          />
        </div>
      </div>

      <div className="flex py-8">
        <label className="w-[240px] shrink-0 text-[18px] font-bold text-gray-800 pt-3">
          동호회 한줄소개
        </label>
        <div className="flex-1 space-y-2">
          <Input
            name="clubOneLine"
            placeholder="예시) 체력단련과 좋은 기운을 받아 건강하게 운동을 즐길 수 있는 산악회"
            inputStyle="w-full bg-gray-100 border-none py-4"
            maxLength={30}
            value={watch("clubOneLine")}
            handleInputChange={(e) => {
              setValue("clubOneLine", e.target.value);
            }}
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-[16px] text-gray-500 font-medium text-left">
              30자 이하로 입력해주세요.
            </p>
            <p className="text-[16px] text-gray-400 font-medium">
              {watch("clubOneLine")?.length || 0}자/30자
            </p>
          </div>
        </div>
      </div>

      <div className="flex py-8">
        <label className="w-[240px] shrink-0 text-[18px] font-bold text-gray-800 pt-3">
          동호회 상세 소개
        </label>
        <div className="flex-1">
          <CustomTextarea
            id="clubDescription"
            {...register("clubDescription")}
            placeholder="예시) 사내동호회를 상세 소개를 통해 잘 알 수 있도록 상세하게 적어주세요."
            rows={6}
            maxLength={130}
            className="bg-gray-100 border-none p-5"
          />
          <div className="flex justify-between mt-2">
            <p className="text-[16px] text-gray-500 font-medium">
              130자 이하로 입력해주세요.
            </p>
            <p className="text-[16px] text-gray-500 font-medium">
              {clubDescription.length}자/130자
            </p>
          </div>
        </div>
      </div>

      <div className="flex py-8">
        <label className="w-[240px] shrink-0 text-[18px] font-bold text-gray-800 pt-3">
          설립 목적
        </label>
        <div className="flex-1">
          <CustomTextarea
            id="clubPurpose"
            {...register("clubPurpose")}
            placeholder="예시) 임직원 사기 증진 및 체력단련을 통한 활동"
            rows={6}
            maxLength={130}
            className="bg-gray-100 border-none p-5"
          />
          <div className="flex justify-between mt-2">
            <p className="text-[16px] text-gray-500 font-medium">
              130자 이하로 입력해주세요.
            </p>
            <p className="text-[16px] text-gray-500 font-medium">
              {clubPurpose.length}자/130자
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-10">
        <FileUploadField
          label="동호회 썸네일"
          id="thumbnailUpload"
          files={watch("thumbnailFile") || []}
          onFileChange={(files) => setValue("thumbnailFile", files)}
          onFileRemove={() => setValue("thumbnailFile", [])}
          placeholder="썸네일 이미지를 첨부하세요."
        />
      </div>
    </div>
  );
}
