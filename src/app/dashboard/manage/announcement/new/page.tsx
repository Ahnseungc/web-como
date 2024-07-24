import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import ImageInput from "@/components/common/ImageInput";
import Input from "@/components/common/Input";
import BackButton from "@/components/dashboard/common/BackButton";

export default function NewClubAnnouncementPage() {
  return (
    <>
      <BackButton />
      <div className="space-y-8 p-8 rounded-xl bg-gray-0">
        <h2 className="font-semibold text-gray-900">{"공지사항 글쓰기"}</h2>
        <div className="space-y-6">
          <Input
            readonly
            name="author"
            type="text"
            label="작성자"
            value="운영장"
          />
          <Input
            name="title"
            type="text"
            label="제목"
            placeholder="제목을 입력하세요"
          />
          <Input
            name="content"
            type="text"
            label="내용"
            placeholder="내용을 입력하세요"
            maxChar={300}
            rows={5}
          />
          <ImageInput
            name="image"
            label="사진첨부"
            caption="첨부파일은 최대 2개까지 등록 가능합니다."
          />
          <Checkbox text="공지사항 상단 고정하기" />
        </div>
        <div className="text-center">
          <Button content="등록하기" className="max-w-[350px]" primary />
        </div>
      </div>
    </>
  );
}
