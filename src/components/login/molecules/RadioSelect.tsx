"use client";

import { useState } from "react";
import RadioButton from "@/components/common/RadioButton";

export default function RadioSelect() {
  const [selectedOption, setSelectedOption] = useState<string>("club");

  return (
    <div className="flex space-x-4">
      <RadioButton
        name="role"
        value="club"
        label="동호회 임원 로그인"
        checked={selectedOption === "club"}
        onChange={() => setSelectedOption("club")}
      />
      <RadioButton
        name="role"
        value="admin"
        label="인사 관리 로그인"
        checked={selectedOption === "admin"}
        onChange={() => setSelectedOption("admin")}
      />
    </div>
  );
}
