"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePlaceSearch } from "@/app/api/map/hook";
import { useGeocode } from "@/app/api/map/hook";
import { closeModal, cn, openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Input from "@/components/common/Input";
import NaverMap from "@/components/dashboard/common/Map";
import { Edit, Search } from "@/assets/icons/util";
import { Calendar } from "@/assets/icons/info";
import { Close, Remove } from "@/assets/icons/action";

const image = null;

export default function ClubInfoTab() {
  const [selectedSchedule, setSelectedSchedule] = useState<{
    dayOfWeek?: string[];
    iteration?: string;
    time: string;
  }>({ time: "19:00" });
  const [selectedPlace, setSelectedPlace] = useState<{
    roadAddress: string;
    title?: string;
  }>();

  const [searchResult, setSearchResult] = useState<
    {
      roadAddress: string;
      title?: string;
    }[]
  >();
  const [closeSearchResult, setCloseSearchResult] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [query, setQuery] = useState<string>();
  const { data: placeData } = usePlaceSearch(searchTerm);
  const { data: geocodeData } = useGeocode(query);

  useEffect(() => {
    if (placeData) {
      //   console.log(placeData);
      if (placeData.items.length < 1) {
        setQuery(searchTerm);
      }
    }
  }, [placeData, searchTerm]);

  useEffect(() => {
    if (placeData) {
      if (placeData.items.length > 0) {
        return setSearchResult(
          placeData.items.map((item) => {
            return { roadAddress: item.roadAddress, title: item.title };
          })
        );
      }
    }
    if (geocodeData) {
      console.log(geocodeData);
      if (geocodeData.meta.totalCount > 0) {
        return setSearchResult(
          geocodeData.addresses.map((item) => {
            return { roadAddress: item.roadAddress };
          })
        );
      }
    }
  }, [placeData, geocodeData]);

  return (
    <form className="flex gap-3">
      <div className="space-y-6">
        <div className="space-y-6 p-5 rounded-xl bg-gray-0">
          <div className="flex items-center justify-between">
            <h3 className="h2 font-bold text-gray-900">{"대표 이미지"}</h3>
            <Edit className="w-6 h-6 text-gray-900 cursor-pointer" />
          </div>
          <div className="w-[350px] h-[342px] rounded-lg bg-gray-300">
            {image && (
              <Image
                src={image}
                alt="대표 이미지"
                fill
                priority
                sizes="(max-width: 800px) 50vw, (max-width: 1000px) 40vw, (max-width: 1500px) 33vw, 20vw"
                className="rounded-lg"
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-4 rounded-md text-center h3 font-bold text-gray-50 bg-gray-900"
        >
          {"저장하기"}
        </button>
      </div>
      <div className="space-y-3 w-full">
        <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
          <h3 className="h2 font-bold text-gray-900">{"기본 정보"}</h3>
          <Input
            name="companyName"
            label="소속 기업명"
            type="text"
            value="코모컴퍼니"
            readonly
          />
          <Input
            name="clubName"
            label="동호회명"
            type="text"
            placeholder="예) 에너제틱 산악 동호회"
          />
          <Input name="category" label="카테고리" type="text" />
          <Input
            name="purpose"
            label="설립 목적"
            type="text"
            placeholder="예) 임직원 단합을 위한 건강한 산악 모임"
          />
          <Input name="overview" label="한줄 소개" type="text" maxChar={18} />
          <Input
            name="description"
            label="상세 소개"
            type="text"
            maxChar={300}
          />
        </div>
        <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
          <h3 className="h2 font-bold text-gray-900">{"활동 정보"}</h3>
          <div>
            <div className="mb-2 h3 font-semibold text-gray-900">
              {"활동 일정"}
            </div>
            <button
              type="button"
              className={cn(
                "flex items-center justify-between w-1/2 h-[60px] py-4 px-3 rounded-md border border-gray-100 h4 font-medium bg-gray-100",
                selectedSchedule.dayOfWeek &&
                  selectedSchedule.iteration &&
                  selectedSchedule.time
                  ? "text-gray-900"
                  : "text-gray-400"
              )}
              onClick={() => openModal("schedule-select")}
            >
              {"활동 일정을 선택해주세요"}
              <Calendar className="w-5 h-5 text-gray-500" />
            </button>
            <div id="schedule-select" className="hidden modal">
              <Backdrop invisible />
              <div className="absolute z-40 space-y-10 w-[390px] py-7 px-5 rounded-xl bg-gray-50 shadow">
                <div className="flex items-center justify-between">
                  <span className="h3 font-bold text-gray-900">
                    {"활동 일정을 선택해주세요."}
                  </span>
                  <button onClick={closeModal}>
                    <Close className="w-6 h-6 text-gray-900" />
                  </button>
                </div>
                <div>
                  <span className="h2 font-bold text-gray-900">{"요일"}</span>
                  <div className="flex items-center justify-between mt-4">
                    {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                      <label
                        key={day}
                        className="flex items-center justify-center w-[34px] h-[34px] rounded-full border border-gray-300 has-[:checked]:border-brand-orange body-2 font-medium text-gray-800 has-[:checked]:text-gray-50 bg-gray-50 has-[:checked]:bg-brand-orange"
                      >
                        <input
                          type="checkbox"
                          name="dayOfWeek"
                          value={day}
                          multiple
                          hidden
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="h2 font-bold text-gray-900">{"횟수"}</span>
                  <div className="flex items-center gap-2 mt-4">
                    {["주 1회", "주 2회", "월 1회", "월 2회"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center justify-center w-[62px] h-[34px] rounded-full border border-gray-300 has-[:checked]:border-brand-orange body-2 font-medium text-gray-800 has-[:checked]:text-gray-50 bg-gray-50 has-[:checked]:bg-brand-orange"
                      >
                        <input
                          type="radio"
                          name="iteration"
                          value={option}
                          multiple
                          hidden
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="h2 font-bold text-gray-900">
                    {"활동 시간"}
                  </span>
                  <div className="text-center mt-4">
                    <input
                      type="time"
                      name="time"
                      id="time"
                      value={selectedSchedule.time}
                      onChange={(e) =>
                        setSelectedSchedule({
                          ...selectedSchedule,
                          time: e.target.value,
                        })
                      }
                      className="h-[34px] px-10 rounded-full outline-none border border-gray-300 focus:border-gray-800 body-2 font-medium text-gray-800 bg-gray-100 focus:bg-gray-50 transition duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="h3 font-semibold text-gray-900">
              {"활동 장소"}
            </span>
            <div className="relative">
              <div className="flex gap-3">
                <div className="flex items-center gap-3 w-3/5 h-[60px] px-3 rounded-md border border-gray-100 has-[:focus-visible]:border-gray-900 bg-gray-100 has-[:focus-visible]:bg-gray-50 transition duration-300">
                  <Search className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="roadAddress"
                    id="roadAddress"
                    placeholder="활동 장소를 검색해주세요"
                    className="peer w-full h4 font-medium outline-none placeholder:text-gray-400 text-gray-900 bg-transparent transition duration-300"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCloseSearchResult(false);
                    }}
                  />
                  {selectedPlace?.roadAddress && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPlace({ roadAddress: "", title: "" });
                        setSearchTerm("");
                      }}
                    >
                      <Remove className="w-5 h-5 text-gray-500 cursor-pointer select-none" />
                    </button>
                  )}
                </div>
                <div className="flex items-center w-2/5 h-[60px] px-3 rounded-md border border-gray-100 has-[:focus-visible]:border-gray-900 bg-gray-100 has-[:focus-visible]:bg-gray-50 transition duration-300">
                  <input
                    type="text"
                    name="detailAddress"
                    id="detailAddress"
                    className="peer w-full h4 font-medium outline-none placeholder:text-gray-400 text-gray-900 bg-transparent transition duration-300"
                    value={selectedPlace?.title}
                    onChange={(e) => {
                      if (selectedPlace?.roadAddress) {
                        setSelectedPlace((prev) => {
                          return {
                            title: e.target.value,
                            roadAddress: prev!.roadAddress,
                          };
                        });
                      }
                    }}
                  />
                </div>
              </div>
              {searchResult && (
                <div
                  className={cn(
                    "absolute z-20 flex flex-col gap-3 w-3/5 mt-1 p-6 rounded-xl bg-gray-50 shadow",
                    closeSearchResult ? "hidden" : "block"
                  )}
                >
                  {searchResult.map((item, i) => (
                    <div
                      key={item.roadAddress + item.title}
                      className={cn(
                        "flex flex-col gap-0.5 border-gray-200 cursor-pointer select-none",
                        i === searchResult.length - 1 ? "" : "pb-3 border-b"
                      )}
                      onClick={() => {
                        setSelectedPlace({
                          roadAddress: item.roadAddress,
                          title: item.title
                            ?.replaceAll("<b>", "")
                            .replaceAll("</b>", ""),
                        });
                        setCloseSearchResult(true);
                        setSearchTerm(item.roadAddress);
                      }}
                    >
                      <p
                        className="body-1 font-semibold text-brand-orange"
                        dangerouslySetInnerHTML={{
                          __html: item.title || item.roadAddress,
                        }}
                      />
                      {item.title && (
                        <span className="body-2 font-medium text-gray-500">
                          {item.roadAddress}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full h-[70vh]">
              <NaverMap query={selectedPlace?.roadAddress} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
