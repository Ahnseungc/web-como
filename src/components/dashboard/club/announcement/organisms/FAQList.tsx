"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Pagination from "@/components/dashboard/common/Pagination";

export default function FAQList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedQuestion, setSelectedQuestion] = useState<number>();

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-8 rounded-2xl bg-gray-0">
      <div className="mb-8 select-none">
        {Array.from({ length: 5 }).map((item, i) => (
          <div key={i} className="border-b border-gray-400">
            <h4
              className={cn(
                "py-11 px-6 h3 text-gray-900 cursor-pointer",
                selectedQuestion === i ? "font-bold" : "font-medium"
              )}
              onClick={() => {
                if (selectedQuestion === i) {
                  setSelectedQuestion(undefined);
                } else {
                  setSelectedQuestion(i);
                }
              }}
            >
              {"Q. 실력별로 나눠서 활동하나요?"}
            </h4>
            {selectedQuestion === i && (
              <div className="p-6 h4 font-medium text-gray-700 bg-gray-100">
                {`올해 첫 중증열성혈소판감소증후군(Severe Fever with Thrombocytopenia Syndrome, 이하 SFTS) 환자가 경북 상주에서 발생한 가운데 농작업과 야외활동 때 각별한 주의가 요구된다.경북도에 따르면 상주에 거주하는 60대 여성 A씨는 4월초순 과수원에서 농작업을 했고, 16일 식욕부진으로 인근 병원에서 진료받았지만 이후에도 발열 증상이 있어 19일 도내 의료기관에 입원했다. 올해 첫 중증열성혈소판감소증후군(Severe Fever with Thrombocytopenia Syndrome, 이하 SFTS) 환자가 경북 상주에서 발생한 가운데 농작업과 야외활동 때 각별한 주의가 요구된다.경북도에 따르면 상주에 거주하는 60대 여성 A씨는 4월초순 과수원에서 농작업을 했고, 16일 식욕부진으로 인근 병원에서 진료받았지만 이후에도 발열 증상이 있어 19일 도내 의료기관에 입원했다. 올해 첫 중증열성혈소판감소증후군(Severe Fever with Thrombocytopenia Syndrome, 이하 SFTS) 환자가 경북 상주에서 발생한 가운데 농작업과 야외활동 때 각별한 주의가 요구된다.경북도에 따르면 상주에 거주하는 60대 여성 A씨는 4월초순 과수원에서 농작업을 했고, 16일 식욕부진으로 인근 병원에서 진료받았지만 이후에도 발열 증상이 있어 19일 도내 의료기관에 입원했다.`}
              </div>
            )}
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        maxPage={8}
      />
    </div>
  );
}
