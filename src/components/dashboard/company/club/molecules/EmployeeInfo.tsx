"use client";

import Input from "@/components/common/Input";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";

interface MemberDetailDTO {
  memberId: number;
  name: string;
  department: string;
  position: string;
  email: string;
  phoneNumber: string;
  createAt: string;
}

export default function EmployeeInfo({ memberId }: { memberId: string }) {
  const { data: memberData } = useQuery<MemberDetailDTO>({
    queryKey: ["member", memberId],
    queryFn: () =>
      getData(`v1/manager/member/${memberId}`, true).then((res) => res.data),
    enabled: !!memberId,
  });

  console.log(memberData);

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h2 className="font-bold text-gray-900">임직원 정보</h2>
      <div className="flex gap-4">
        <Input
          readOnly
          name="name"
          label="이름"
          value={memberData?.name || ""}
        />
        <Input
          readOnly
          name="dept"
          label="부서"
          value={memberData?.department || ""}
        />
        <Input
          readOnly
          name="rank"
          label="직급"
          value={memberData?.position || ""}
        />
        <Input
          readOnly
          name="date"
          label="가입일"
          value={memberData?.createAt ? memberData.createAt : ""}
        />
      </div>
    </div>
  );
}
