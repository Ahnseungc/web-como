"use client";

import Button from "@/components/common/Button";
import ToggleSelect from "@/components/login/molecules/ToggleSelect";

export default function SelectClubForm() {
  const handleSelectClub = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-8 rounded-4xl shadow bg-gray-0">
      <form
        onSubmit={handleSelectClub}
        className="space-y-[38px] w-[530px] py-6"
      >
        <h2 className="h1 text-center font-bold text-gray-1000">
          {"어떤 동호회를 관리하시겠어요?"}
        </h2>
        <ToggleSelect />
        <Button content="확인" primary />
      </form>
    </div>
  );
}
