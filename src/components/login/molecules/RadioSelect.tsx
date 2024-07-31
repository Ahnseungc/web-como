"use client";

import RadioButton from "@/components/common/RadioButton";

interface Props {
  currentValue: string;
  handleChange: (newValue: string) => void;
}

export default function RadioSelect(props: Props) {
  return (
    <div className="flex space-x-4">
      <RadioButton
        name="role"
        value="club"
        label="동호회 임원 로그인"
        checked={props.currentValue === "club"}
        onChange={() => props.handleChange("club")}
      />
      <RadioButton
        name="role"
        value="company"
        label="인사 관리 로그인"
        checked={props.currentValue === "company"}
        onChange={() => props.handleChange("company")}
      />
    </div>
  );
}
