"use client";

import { useState } from "react";
import Image from "next/image";
import { openModal } from "@/lib/utils";
import Button from "@/components/common/Button";
import Chip from "@/components/common/Chip";
import Input from "@/components/common/Input";
import ImageInput from "@/components/common/ImageInput";
import StarRating from "@/components/common/StarRating";

export default function NewReviewForm() {
  const [formValues, setFormValues] = useState<{
    rating: number;
    content: string;
  }>({ rating: 0, content: "" });
  const [currentImages, setCurrentImages] = useState<File[]>([]);
  const image = null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal("review-submit-success");
  };

  return (
    <form
      className="space-y-10 p-8 rounded-xl bg-gray-0"
      onSubmit={handleSubmit}
    >
      <div className="space-y-7">
        <div>
          <div className="flex gap-8">
            <div className="min-w-[200px] min-h-[200px] max-h-[200px] rounded-xl bg-gray-300 object-cover">
              {image && (
                <Image src={image} alt="대표 이미지" fill sizes="40vw" />
              )}
            </div>
            <div>
              <div className="flex flex-col justify-between h-[200px] py-3">
                <div className="body-1 font-medium text-gray-500">
                  {"주문번호: 000000"}
                </div>
                <div className="space-y-2">
                  <Chip content="카테고리" primary />
                  <h2 className="w-[300px] break-keep font-semibold text-gray-900 whitespace-pre-line">
                    {`이드커피, 몰입이 될 수밖에 없는 동굴 속 도서관 [SQNC 052]`}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h2 font-extrabold text-point-red">
                    {"7%"}
                  </span>
                  <span className="h2 font-extrabold text-gray-900">{`${(30000).toLocaleString()}원~`}</span>
                  <span className="h3 font-normal text-gray-500">{"/인"}</span>
                </div>
              </div>
              <ul className="space-y-1 py-3">
                {Array.from({ length: 3 }).map((e, i) => (
                  <li key={i} className="body-2 font-medium text-gray-500">
                    {"옵션명 옵션명 옵션명 / 30000원 / 3개"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="border-gray-400" />
        <div>
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">{"이용 정보"}</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-3 body-1 font-bold text-gray-900">
                <div className="min-w-20 font-medium text-gray-500">
                  {"예약자"}
                </div>
                {"핀데브 인사팀"}
              </div>
              <div className="flex items-center gap-3 body-1 font-bold text-gray-900">
                <div className="min-w-20 font-medium text-gray-500">
                  {"참여 인원"}
                </div>
                {"24명"}
              </div>
              <div className="flex items-center gap-3 body-1 font-bold text-gray-900">
                <div className="min-w-20 font-medium text-gray-500">
                  {"활동 일자"}
                </div>
                {"2024-08-01"}
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-400" />
        <div>
          <StarRating
            name="rating"
            label="활동에 만족하셨나요?"
            currentValue={formValues.rating}
            handleChange={(rating) =>
              setFormValues((prev) => {
                return { ...prev, rating };
              })
            }
          />
        </div>
        <hr className="border-gray-400" />
        <div>
          <Input
            name="content"
            label="후기 작성"
            placeholder="후기를 작성해주세요"
            maxChar={300}
            currentValue={formValues.content}
            handleInputChange={(e) =>
              setFormValues((prev) => {
                return { ...prev, content: e.target.value };
              })
            }
          />
        </div>
        <hr className="border-gray-400" />
        <div>
          <ImageInput
            name="image"
            currentImages={currentImages}
            setCurrentImages={setCurrentImages}
            label="사진 첨부"
            caption="최대 5장까지 첨부 가능합니다."
            max={5}
          />
        </div>
      </div>
      <Button
        primary
        content="후기 등록하기"
        disabled={!formValues.rating || !formValues.content}
      />
    </form>
  );
}
