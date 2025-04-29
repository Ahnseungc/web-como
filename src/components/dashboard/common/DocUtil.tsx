import { Document, Print } from "@/assets/icons/util";

export const PrintButton = () => {
  return (
    <button className="p-1 rounded bg-gray-900">
      <Print className="w-6 h-6 text-gray-0" />
    </button>
  );
};

export const SaveButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      className="p-1 rounded bg-point-green"
      onClick={onClick} // 함수만 전달
    >
      <Document className="w-6 h-6 text-gray-0" />
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
