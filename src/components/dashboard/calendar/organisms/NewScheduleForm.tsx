"use client";

import { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { closeModal, cn } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Chip from "@/components/common/Chip";
import Input from "@/components/common/Input";
import ClubProfileInfo from "@/components/dashboard/common/ClubProfileInfo";
import MapPlaceSearch from "@/components/dashboard/manage/organisms/MapPlaceSearch";
import { Close, CountMinus, CountPlus } from "@/assets/icons/action";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

const image = null;
const MIN_PEOPLE = 1;
const MAX_PEOPLE = 10;

export default function NewScheduleForm() {
  const [maxPeople, setMaxPeople] = useState<number>(1);

  return (
    <div id="new-schedule-form" className="hidden modal">
      <Backdrop />
      <div className="absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 w-full max-w-[1248px] h-full max-h-screen p-6">
        <div className="p-8 rounded-xl bg-gray-0 shadow">
          <div className="flex justify-between">
            <h2 className="font-bold text-gray-900">{"동호회 일정 등록"}</h2>
            <button onClick={closeModal}>
              <Close className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex gap-8 mt-10">
            <div className="w-fit h-fit rounded-xl border border-gray-300">
              <div className="w-80 xl:w-[390px] aspect-[10/9] rounded-t-xl bg-gray-300">
                {image && (
                  <Image
                    src={image}
                    alt="동호회 사진"
                    className="rounded-t-xl"
                  />
                )}
              </div>
              <div className="space-y-6 py-8 px-5">
                <div className="space-y-3">
                  <h3 className="h2 font-bold text-gray-900">{"동호회명"}</h3>
                  <div className="flex gap-2">
                    <Chip content="운영 중" orange />
                    <Chip content="카테고리" primary />
                  </div>
                </div>
                <div className="body-1 font-medium text-gray-500">
                  <ClubProfileInfo />
                  <span>{"회장_김오모 / 부회장_박오모 / 총무_문오모 "}</span>
                </div>
              </div>
            </div>
            <form className="flex-1 space-y-6">
              <Input
                name="title"
                label="제목"
                placeholder="제목을 입력해주세요."
                maxChar={30}
              />
              <Input
                name="description"
                label="상세 정보"
                placeholder="상세 정보를 작성해주세요."
                maxChar={300}
              />
              <div className="space-y-2">
                <label htmlFor="max" className="h3 font-semibold text-gray-900">
                  {"최대 인원수"}
                </label>
                <div
                  className={cn(
                    "flex items-center w-fit h-9 rounded-lg border border-gray-300 bg-gray-50",
                    poppins.className
                  )}
                >
                  <button
                    type="button"
                    className="flex items-center justify-center w-9 h-9 rounded-s-lg border-r border-gray-300 text-gray-900 disabled:text-gray-300 disabled:bg-gray-200"
                    onClick={() => setMaxPeople((prev) => prev - 1)}
                    disabled={maxPeople === MIN_PEOPLE}
                  >
                    <CountMinus />
                  </button>
                  <input
                    id="max"
                    name="max"
                    type="number"
                    value={maxPeople}
                    onChange={(e) => setMaxPeople(parseInt(e.target.value))}
                    min={MIN_PEOPLE}
                    max={MAX_PEOPLE}
                    className="w-14 h-full outline-none text-center body-1 font-medium text-gray-900"
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center w-9 h-9 rounded-e-lg border-l border-gray-300 text-gray-900 disabled:text-gray-300 disabled:bg-gray-200"
                    onClick={() => setMaxPeople((prev) => prev + 1)}
                    disabled={maxPeople === MAX_PEOPLE}
                  >
                    <CountPlus />
                  </button>
                </div>
              </div>
              <MapPlaceSearch />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
