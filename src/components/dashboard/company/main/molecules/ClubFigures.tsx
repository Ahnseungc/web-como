"use client";

import { useEffect, useState } from "react";
import { getData } from "@/api/action";

export default function ClubFigures() {
  const [pendingCount, setPendingCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);


  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await getData('v1/manager/club/pending-count');
        // console.log("response", response);
        if (response && response.data) {
          setPendingCount(response.data);  // API 응답 구조에 맞게 수정
        }
      } catch (error) {
        console.error("Error fetching pending count:", error);
      }
    };

    fetchPendingCount();
  }, []);

  useEffect(() => {
    const fetchCurrentCount = async () => {
      try {
        const response = await getData('v1/manager/club/approved-count');
        // console.log("response", response);
        if (response && response.data) {
          setCurrentCount(response.data);  // API 응답 구조에 맞게 수정
        }
      } catch (error) {
        console.error("Error fetching current count:", error);
      }
    };

    fetchCurrentCount();
  }, []);

  return (
    <div className="flex-grow-[2] flex gap-6 py-8 px-10 rounded-xl bg-gray-0">
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"신규 동호회"}
        </div>
        <div className="h1 font-extrabold text-gray-900 truncate">
          {pendingCount}
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"해체한 동호회"}
        </div>
        <div className="h1 font-extrabold text-gray-900 truncate">
          {"0개"}
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"현재 사내동호회 수"}
        </div>
        <div className="h1 font-extrabold text-brand-orange truncate">
          {currentCount}
        </div>
      </div>
    </div>
  );
}
