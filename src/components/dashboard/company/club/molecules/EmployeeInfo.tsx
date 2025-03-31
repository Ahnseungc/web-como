'use client';

import Input from "@/components/common/Input";
import { useState, useEffect } from "react";
import { getData } from "@/api/action";
import { formatDate } from "@/lib/utils";

interface MemberDetailDTO {
  memberId: number;
  name: string;
  department: string;
  position: string;
  email: string;
  phoneNumber: string;
  createdDate: number[];
}

export default function EmployeeInfo({ memberId }: { memberId: string }) {
	const [memberData, setMemberData] = useState<MemberDetailDTO | null>(null);
  console.log(memberId);

	const convertArrayToDate = (dateArray: number[]) => {
		if (!dateArray || dateArray.length < 3) return new Date();
		// [2025, 4, 1, 3, 4, 55] -> new Date(2025, 3, 1) (월은 0부터 시작하므로 -1)
		return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
	};

	useEffect(() => {
		const loadMemberData = async () => {
			try {
				const res = await getData(`v1/manager/member/${memberId}`, true); 
        setMemberData(res.data);
        console.log(res.data);
			} catch (error) {
				console.error("임직원 정보 로딩 오류:", error);
			}
		};
		loadMemberData();
	}, [memberId]); 

	return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h2 className="font-bold text-gray-900">{"임직원 정보"}</h2>
      <div className="flex gap-4">
        <Input readOnly name="name" label="이름" value={memberData?.name || ''} />
        <Input readOnly name="dept" label="부서" value={memberData?.department || ''} />
        <Input readOnly name="rank" label="직급" value={memberData?.position || ''} />
        <Input 
          readOnly 
          name="date" 
          label="입사일" 
          value={memberData?.createdDate ? formatDate(convertArrayToDate(memberData.createdDate)) : ''} 
        />
      </div>
    </div>
  );
}