"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Input, { InputLabel } from "@/components/common/Input";
import { Close } from "@/assets/icons/action";
import { useEffect } from "react";
import { useState } from "react";
import { getData } from "@/api/action";
import Image from "next/image";

export interface Club {
  activityPlan: string | null;
  affairsDepartment: string | null;
  affairsId: string | null;
  affairsName: string | null;
  category: string;
  clubImage: string | null;
  deputyDepartment: string | null;
  deputyId: string | null;
  deputyName: string | null;
  goal: string;
  headDepartment: string;
  headId: number;
  headName: string;
  intro: string;
  location: string | null;
  name: string;
}

export default function ClubInfoModal() {
  const [club, setClub] = useState<Club | null>(null);
  const [modalParams, setModalParams] = useState<any>(null);

  useEffect(() => {
    const modal = document.getElementById("club-info");
    if (modal) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-modal-params"
          ) {
            const newParams = modal.dataset.modalParams;
            if (newParams) {
              setModalParams(JSON.parse(newParams));
            }
          }
        });
      });

      observer.observe(modal, {
        attributes: true,
        attributeFilter: ["data-modal-params"],
      });

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const loadClubData = async () => {
      if (!modalParams?.clubId) return;
      console.log("modalParams", modalParams);

      try {
        const res = await getData(
          `v1/manager/club/${modalParams.clubId}`,
          true
        );
        console.log("loadClubData", res);
        setClub(res.data);
      } catch (error) {
        console.error("동호회 정보 로딩 오류:", error);
      }
    };

    loadClubData();
  }, [modalParams]);

  return (
    <div id="club-info" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 w-full max-w-[960px] p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-6 h-full max-h-screen overflow-y-auto p-4 scrollbar-custom">
          <div className="flex items-center justify-between">
            <h2 className="text-center h1 font-bold text-gray-900">
              {"가입한 동호회"}
            </h2>
            <button onClick={() => closeModal()}>
              <Close className="w-8 h-8" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-[360px] h-[360px] rounded-lg bg-gray-300">
              {club?.clubImage && (
                <Image
                  src={club?.clubImage}
                  alt="동호회 이미지"
                  fill
                  sizes="15vw"
                  className="rounded-lg"
                />
              )}
            </div>
            <div className="flex-1 space-y-6">
              <Input label="동호회명" value={club?.name || ""} />
              <div className="space-y-2">
                <InputLabel label="동호회 임원" />
                <Input
                  value={`동호회 회장 : ${club?.headName || ""} ${club?.headDepartment || ""}`}
                />
                <Input
                  value={`동호회 부회장 : ${club?.deputyName || ""} ${club?.deputyDepartment || ""}`}
                />
                <Input
                  value={`총무 : ${club?.affairsName || ""} ${club?.affairsDepartment || ""}`}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Input label="활동 지역" value={club?.location || ""} />
            <Input label="활동 일정" value={club?.activityPlan || ""} />
            {/* <Input label="회원수" value="최소 3명, 최대 20명" /> */}
            {/* <Input label="월회비" value="150,000원" /> */}
          </div>
          <Input label="동호회 한줄 소개" value={club?.intro || ""} />
          {/* <Input label="동호회 상세 소개" value="다양한 오모인들이 모입니다" /> */}
          <Input label="설립 목적" value={club?.goal || ""} />
        </div>
      </div>
    </div>
  );
}
