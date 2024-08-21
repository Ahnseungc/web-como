import Input from "@/components/common/Input";

export default function EmployeeInfo(){
	return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h2 className="font-bold text-gray-900">{"임직원 정보"}</h2>
      <div className="flex gap-4">
        <Input readOnly name="name" label="이름" value="김오모" />
        <Input readOnly name="dept" label="부서" value="경영지원" />
        <Input readOnly name="rank" label="직급" value="대리" />
        <Input readOnly name="date" label="입사일" value="2024-07-16" />
      </div>
    </div>
  );
}