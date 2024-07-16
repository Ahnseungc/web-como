import Input from "@/components/common/Input";

export default function ClubApplicationTab() {
  return (
    <div className="space-y-6 p-8 rounded-2xl bg-gray-0">
      <h2 className="font-semibold text-gray-900">{"가입 신청서 질문"}</h2>
      <Input
        name="question"
        placeholder="질문을 입력해주세요."
        label="사전질문"
        maxChar={100}
      />
    </div>
  );
}
