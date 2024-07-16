import Image from "next/image";
import PrintIcon from "@/assets/icons/utilButton/print.svg";
import DocIcon from "@/assets/icons/utilButton/document.svg";

export const PrintButton = () => {
  return (
    <button className="p-1 rounded bg-gray-900">
      <Image src={PrintIcon} alt="출력" width={24} height={24} />
    </button>
  );
};

export const SaveButton = () => {
  return (
    <button className="p-1 rounded bg-point-green">
      <Image src={DocIcon} alt="저장" width={24} height={24} />
    </button>
  );
};

export default function DocUtilButtons() {
  return (
    <div className="flex gap-3">
      <PrintButton />
      <SaveButton />
    </div>
  );
}
