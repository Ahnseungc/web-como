"use client";

import { useState } from "react";
import Image from "next/image";
import { usePlaceSearch } from "@/app/api/map/hook";
import { cn } from "@/lib/utils";
import Input from "@/components/common/Input";
import NaverMap from "@/components/dashboard/common/Map";
import EditIcon from "@/assets/icons/edit.svg";
import SearchIcon from "@/assets/icons/search.svg";
import RemoveIcon from "@/assets/icons/remove.svg";

const image = null;

export default function ClubInfoTab() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedPlace, setSelectedPlace] = useState<{
    roadAddress: string;
    name: string;
  }>();

  const [closeSearchResult, setCloseSearchResult] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>();
  const { data: searchData } = usePlaceSearch(searchTerm);

  return (
    <form className="flex gap-3">
      <div className="space-y-6">
        <div className="space-y-6 p-5 rounded-xl bg-gray-0">
          <div className="flex items-center justify-between">
            <h3 className="h2 font-bold text-gray-900">{"대표 이미지"}</h3>
            <Image
              src={EditIcon}
              alt="편집"
              width={24}
              height={24}
              className="cursor-pointer"
            />
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
          <div className="flex flex-col gap-2">
            <span className="h3 font-semibold text-gray-900">
              {"활동 일정"}
            </span>
            <button
              type="button"
              className={cn(
                "flex gap-3 w-1/2 h-[60px] py-4 px-3 rounded-md border border-gray-100 h4 font-medium bg-gray-100",
                selectedDate ? "text-gray-900" : "text-gray-400"
              )}
            >
              {"활동 일정을 선택해주세요"}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <span className="h3 font-semibold text-gray-900">
              {"활동 장소"}
            </span>
            <div className="relative">
              <div className="flex gap-3">
                <div className="flex items-center gap-3 w-3/5 h-[60px] px-3 rounded-md border border-gray-100 has-[:focus-visible]:border-gray-900 bg-gray-100 has-[:focus-visible]:bg-gray-50 transition duration-300">
                  <Image src={SearchIcon} alt="검색" width={20} height={20} />
                  <input
                    type="text"
                    name="term"
                    id="term"
                    placeholder="활동 장소를 검색해주세요"
                    className="peer w-full h4 font-medium outline-none placeholder:text-gray-400 text-gray-900 bg-transparent transition duration-300"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCloseSearchResult(false);
                    }}
                  />
                  {selectedPlace && (
                    <Image
                      src={RemoveIcon}
                      alt="삭제"
                      width={20}
                      height={20}
                      className="cursor-pointer select-none"
                      onClick={() => {
                        setSelectedPlace(undefined);
                        setSearchTerm("");
                      }}
                    />
                  )}
                </div>
                <div
                  className="w-2/5 h-[60px] py-4 px-3 rounded-md h4 font-medium text-gray-900 border border-gray-100 bg-gray-100"
                  dangerouslySetInnerHTML={{
                    __html: selectedPlace?.name || "",
                  }}
                />
              </div>
              {searchData && (
                <div
                  className={cn(
                    "absolute z-20 flex flex-col gap-3 w-3/5 mt-1 p-6 rounded-xl bg-gray-50 shadow",
                    closeSearchResult ? "hidden" : "block"
                  )}
                >
                  {searchData.items.map((item, i) => (
                    <div
                      key={item.mapx + item.mapy}
                      className={cn(
                        "flex flex-col gap-0.5 border-gray-200 cursor-pointer select-none",
                        i === searchData.items.length - 1 ? "" : "pb-3 border-b"
                      )}
                      onClick={() => {
                        setSelectedPlace({
                          roadAddress: item.roadAddress,
                          name: item.title,
                        });
                        setCloseSearchResult(true);
                        setSearchTerm(item.roadAddress);
                      }}
                    >
                      <p
                        className="body-1 font-semibold text-brand-orange"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                      <span className="body-2 font-medium text-gray-500">
                        {item.roadAddress}
                      </span>
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
