"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ToggleSelect() {
  const [selectedOption, setSelectedOption] = useState<string>("A");

  return (
    <div className="flex flex-col gap-4">
      {["A", "B", "C"].map((club) => (
        <label key={club} className="cursor-pointer">
          <input
            type="radio"
            name="club"
            value={club}
            checked={selectedOption === club}
            onChange={() => setSelectedOption(club)}
            className="hidden"
          />
          <div
            className={cn(
              "w-full py-[18px] px-3 rounded-md",
              selectedOption === club ? "bg-orange-500" : "bg-gray-200"
            )}
          >
            <span
              className={cn(
                "h4 font-bold",
                selectedOption === club ? "text-gray-0" : "text-gray-900"
              )}
            >
              {club}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
}
