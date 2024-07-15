import Image from "next/image";
import PrintIcon from "@/assets/icons/utilButton/print.svg";
import DocIcon from "@/assets/icons/utilButton/document.svg";

export default function DocUtilButtons() {
  return (
    <div className="flex gap-3">
      <button className="p-1 rounded bg-gray-900">
        <Image src={PrintIcon} alt="출력" width={24} height={24} />
      </button>
      <button className="p-1 rounded bg-point-green">
        <Image src={DocIcon} alt="저장" width={24} height={24} />
      </button>
    </div>
  );
}
