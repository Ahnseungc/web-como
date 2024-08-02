"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { closeModal, generateQuarterHourlyIntervals } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Chip from "@/components/common/Chip";
import Counter from "@/components/common/Counter";
import DatePicker from "@/components/common/DatePicker";
import DropdownSelect from "@/components/common/DropdownSelect";
import Input from "@/components/common/Input";
import ClubProfileInfo from "@/components/dashboard/club/common/ClubProfileInfo";
import MapPlaceSearch from "@/components/dashboard/club/manage/organisms/MapPlaceSearch";
import DateDropdownSelect from "@/components/dashboard/club/calendar/atoms/DateDropdownSelect";
import { Close } from "@/assets/icons/action";

const image = null;
const MIN_PEOPLE = 1;
const MAX_PEOPLE = 10;

const iterationOptions = [
  { name: "반복선택 안함", value: "none" },
  { name: "1개월", value: "one-month" },
  { name: "3개월", value: "three-month" },
  { name: "6개월", value: "six-month" },
];

export default function NewScheduleForm() {
  const [maxPeople, setMaxPeople] = useState<number>(1);
  const [currentDate, setCurrentDate] = useState<{
    date: Date | undefined;
    time: Date | undefined;
    iteration: string;
  }>({ date: undefined, time: undefined, iteration: "none" });
  const [intervals, setIntervals] = useState<Date[]>();

  useEffect(() => {
    if (currentDate.date) {
      const startDate = new Date(currentDate.date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(currentDate.date);
      endDate.setHours(23, 45, 0, 0);

      const intervals = generateQuarterHourlyIntervals(startDate, endDate, 15);
      setIntervals(intervals);
    }
  }, [currentDate]);

  return (
    <div id="new-schedule-form" className="hidden modal">
      <Backdrop />
      <div className="absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 w-full max-w-[1248px] h-full max-h-screen p-6">
        <div className="p-8 rounded-xl bg-gray-0 shadow">
          <div className="flex justify-between">
            <h2 className="font-bold text-gray-900">{"동호회 일정 등록"}</h2>
            <button onClick={() => closeModal()}>
              <Close className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex gap-8 mt-10">
            <div className="w-fit h-fit rounded-xl border border-gray-300">
              <div className="w-96 aspect-[10/9] rounded-t-xl bg-gray-300">
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
                <label
                  htmlFor="date"
                  className="h3 font-semibold text-gray-900"
                >
                  {"활동 일정 설정"}
                </label>
                <div className="flex gap-3">
                  <DatePicker
                    id="date"
                    size="h-[60px]"
                    textStyle="h4 font-medium text-gray-900"
                    currentDate={currentDate.date}
                    handleDateChange={(date) =>
                      setCurrentDate((prev) => {
                        return { ...prev, date };
                      })
                    }
                  />
                  <DateDropdownSelect
                    id="time"
                    placeholder="시간선택"
                    options={intervals}
                    currentValue={currentDate.time}
                    handleChange={(time) =>
                      setCurrentDate((prev) => {
                        return { ...prev, time };
                      })
                    }
                  />
                  <DropdownSelect
                    required
                    id="iteration"
                    width="w-52"
                    options={iterationOptions}
                    currentValue={currentDate.iteration}
                    handleChange={(iteration) =>
                      setCurrentDate((prev) => {
                        return { ...prev, iteration };
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="max" className="h3 font-semibold text-gray-900">
                  {"최대 인원수"}
                </label>
                <Counter
                  minValue={MIN_PEOPLE}
                  maxValue={MAX_PEOPLE}
                  currentValue={maxPeople}
                  handleChange={(newValue: number) => setMaxPeople(newValue)}
                />
              </div>
              <MapPlaceSearch />
              <Button content="등록하기" orange disabled />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
