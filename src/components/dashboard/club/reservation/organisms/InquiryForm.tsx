"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { openModal } from "@/lib/utils";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import DropdownSelect from "@/components/common/DropdownSelect";
import Input from "@/components/common/Input";
import { Category } from "@/assets/icons/info";
import { ChevronRight } from "@/assets/icons/chevron";

const initialFormValues = {
  type: "",
  title: "",
  content: "",
};

export default function InquiryForm() {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    setIsSubmitDisabled(
      !formValues.type || !formValues.title || !formValues.content
    );
  }, [formValues]);

  const handleSubmit = () => {
    openModal("inquiry-success");
    setFormValues(initialFormValues);
  };

  return (
    <div className="p-8 rounded-xl bg-gray-0">
      <div className="flex gap-3">
        <div className="flex-1 space-y-3">
          <h4 className="font-bold text-gray-900">{"문의 상품"}</h4>
          <div className="p-5 rounded-md bg-gray-0 shadow">
            <Link
              href={`${CLUB_DASHBOARD_ENDPOINT}/reservation/item/${1}`}
              className="flex items-center gap-3"
            >
              <div className="w-[100px] h-[100px] rounded-lg bg-gray-300"></div>
              <div className="space-y-3">
                <div className="w-[300px] break-keep body-1 font-medium text-gray-900">
                  {"이드커피, 몰입이 될 수밖에 없는 동굴 속 도서관 [SQNC 052]"}
                </div>
                <div className="flex items-center gap-2">
                  <span className="h2 font-extrabold text-point-red">
                    {"7%"}
                  </span>
                  <span className="h2 font-extrabold text-gray-900">{`${(30000).toLocaleString()}원~`}</span>
                  <span className="h3 font-normal text-gray-500">{"/인"}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <h4 className="font-bold text-gray-900">{"문의할 호스트"}</h4>
          <div className="py-[42px] px-5 rounded-md bg-gray-0 shadow">
            <Link
              href={`${CLUB_DASHBOARD_ENDPOINT}/reservation/host/${1}`}
              className="flex items-center gap-2"
            >
              <Avatar size="w-[56px] h-[56px]" />
              <div>
                <div className="flex items-center h4 font-bold text-gray-900">
                  {"호스트명"}
                  <ChevronRight className="w-4 h-4 xl:w-6 xl:h-6" />
                </div>
                <div className="flex items-center mt-[3px] caption-1 font-medium text-gray-500">
                  <Category className="w-3.5 h-3.5" />
                  {"카테고리"}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <hr className="mt-12 mb-6 border-gray-200" />
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="type" className="h3 font-semibold text-gray-900">
            {"문의 유형"}
          </label>
          <DropdownSelect
            id="type"
            width="w-[188px]"
            placeholder="선택해 주세요"
            options={["예약 상세 문의", "인원 문의", "커리큘럼", "기타"]}
            currentValue={formValues.type}
            handleChange={(newValue) =>
              setFormValues((prev) => {
                return { ...prev, type: newValue };
              })
            }
          />
        </div>
        <Input
          name="title"
          label="제목"
          placeholder="제목을 입력하세요"
          currentValue={formValues.title}
          handleInputChange={(e) =>
            setFormValues((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
        />
        <Input
          name="content"
          label="내용"
          placeholder="내용을 입력하세요"
          maxChar={300}
          rows={6}
          currentValue={formValues.content}
          handleInputChange={(e) =>
            setFormValues((prev) => {
              return { ...prev, content: e.target.value };
            })
          }
        />
        {/* <div className="text-right">
          <button className="py-3 px-4 rounded-md h4 font-semibold text-gray-50 bg-gray-900">
            {"문의하기"}
          </button>
        </div> */}
        <div className="text-center">
          <Button
            content="문의하기"
            primary
            className="max-w-[350px]"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
