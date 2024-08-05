import Input from "@/components/common/Input";
import ImageInput from "@/components/common/ImageInput";

export default function SupplyDetail() {
  return (
    <div className="space-y-3 w-full">
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <h3 className="h2 font-bold text-gray-900">{"기본 정보"}</h3>
        <Input
          name="clubName"
          label="동호회명"
          type="text"
          value="산악동호회"
          readonly
        />
        <Input
          name="author"
          label="담당 동호회 임원"
          type="text"
          value="김오모 / 인사팀 / 대리 / 회장(동호회 직급)"
          readonly
        />
        <Input
          name="name"
          label="품목 이름"
          type="text"
          readonly
          value="빔프로젝터"
        />
        <Input
          name="purpose"
          label="구매 목적"
          type="text"
          readonly
          value="PT시 필요자료 띄우기"
        />
        <Input
          name="price"
          label="구매 비용"
          type="number"
          inputStyle="max-w-[350px]"
          readonly
          value="319,000원"
        />
        <ImageInput name="image" label="비품 사진" />
        <Input name="note" label="비고" type="text" readonly />
      </div>
    </div>
  );
}
