"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Button from "@/components/common/Button";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import { Document } from "@/assets/icons/util";

const document = [
  { name: "제목", content: "서류 제목 서류 제목" },
  { name: "최종 수정일", content: "2024-08-05" },
  { name: "작성자", content: "김오모" },
];

export default function DocumentDetail() {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <div className="space-y-8 p-8 rounded-xl bg-gray-0">
      <h2 className="font-semibold text-gray-900">
        {pathname.startsWith("/company") ? "사내 규정 및 서류" : "서류 다운로드"}
      </h2>
      <div className="space-y-8">
        <ul>
          {document.map((item, i) => (
            <li
              key={item.name}
              className={cn(
                "flex border-gray-400",
                i === 0 ? "border-y" : "border-b"
              )}
            >
              <div className="w-32 py-3 px-6 body-1 font-bold text-gray-900 bg-gray-200">
                {item.name}
              </div>
              <div className="flex items-center py-3 px-6 body-1 font-medium text-gray-800 bg-gray-0 truncate">
                {item.content}
              </div>
            </li>
          ))}
        </ul>
        <p className="body-1 font-medium text-gray-800">
          {
            "올해 첫 중증열성혈소판감소증후군(Severe Fever with Thrombocytopenia Syndrome, 이하 SFTS) 환자가 경북 상주에서 발생한 가운데 농작업과 야외활동 때 각별한 주의가 요구된다.경북도에 따르면 상주에 거주하는 60대 여성 A"
          }
        </p>
        <div className="space-y-2">
          <div className="body-1 font-bold text-gray-600">{"파일 목록"}</div>
          <ul className="space-y-2">
            {[1, 2, 3].map((file, i) => (
              <li
                key={i}
                className="flex items-center justify-between p-3 rounded-md border border-gray-400 bg-gray-0"
              >
                <div className="flex gap-2 h4 font-medium text-gray-800">
                  <Document className="w-6 h-6 text-gray-500" />
                  {"동호회 운영 지침 사내 임직원 안내용 PT자료.pdf"}
                </div>
                <DocUtilButtons />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {pathname.startsWith("/company") && (
        <Button
          primary
          content="수정하기"
          className="max-w-[350px] mx-auto"
          onClick={() => push(`../new?edit=${1}`)}
        />
      )}
    </div>
  );
}
