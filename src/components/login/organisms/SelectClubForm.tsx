import Button from "@/components/common/Button";
import ToggleSelect from "@/components/login/molecules/ToggleSelect";

export default function SelectClubForm() {
  return (
    <div className="p-8 rounded-4xl shadow bg-gray-0">
      <form action="" className="space-y-[38px] w-[530px] py-6">
        <h2 className="h1 text-center font-bold text-gray-1000">
          {"어떤 동호회를 관리하시겠어요?"}
        </h2>
        <ToggleSelect />
        <Button content="확인" primary />
      </form>
    </div>
  );
}
