"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function RadioSelect() {
  const [selectedOption, setSelectedOption] = useState<string>("member");

  return (
    <div className="flex space-x-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="role"
          value="member"
          checked={selectedOption === "member"}
          onChange={() => setSelectedOption("member")}
          className="hidden"
        />
        <div
          className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full border bg-gray-50",
            selectedOption === "member"
              ? "border-orange-500"
              : "border-gray-300"
          )}
        >
          <div
            className={
              selectedOption === "member"
                ? "w-3 h-3 rounded-full bg-orange-500"
                : "hidden"
            }
          />
        </div>
        <span className="ml-2 h4 font-medium text-gray-900">
          {"동호회 임원 로그인"}
        </span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="role"
          value="admin"
          checked={selectedOption === "admin"}
          onChange={() => setSelectedOption("admin")}
          className="hidden"
        />
        <div
          className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full border bg-gray-50",
            selectedOption === "admin" ? "border-orange-500" : "border-gray-300"
          )}
        >
          <div
            className={
              selectedOption === "admin"
                ? "w-3 h-3 rounded-full bg-orange-500"
                : "hidden"
            }
          />
        </div>
        <span className="ml-2 h4 font-medium text-gray-900">
          {"인사 관리 로그인"}
        </span>
      </label>
    </div>
  );
}
