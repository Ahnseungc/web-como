import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import { Document } from "@/assets/icons/util";

export default function FileItem() {
  return (
    <li className="flex items-center justify-between p-3 rounded-md border border-gray-400 bg-gray-0">
      <div className="flex gap-2 h4 font-medium text-gray-800">
        <Document className="w-6 h-6 text-gray-500" />
        {"동호회 운영 지침 사내 임직원 안내용 PT자료.pdf"}
      </div>
      <DocUtilButtons />
    </li>
  );
}
