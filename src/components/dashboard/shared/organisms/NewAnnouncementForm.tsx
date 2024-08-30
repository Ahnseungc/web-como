"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import useNavigationGuard from "@/hooks/navigationGuard";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import ImageInput from "@/components/common/ImageInput";
import Input from "@/components/common/Input";
import FileDragNDropInput from "@/components/common/FileDragNDropInput";

export default function NewAnnouncementForm() {
  useNavigationGuard();
  const pathname = usePathname();

  const [formValues, setFormValues] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });
  const [currentImages, setCurrentImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="space-y-8 p-8 rounded-xl bg-gray-0"
      onSubmit={handleSubmit}
    >
      <h2 className="font-semibold text-gray-900">{"공지사항 글쓰기"}</h2>
      <div className="space-y-6">
        <Input
          readOnly
          name="author"
          type="text"
          label="작성자"
          value="운영장"
        />
        <Input
          required
          name="title"
          type="text"
          label="제목"
          placeholder="제목을 입력하세요"
          currentValue={formValues.title}
          handleInputChange={(e) =>
            setFormValues((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
        />
        <Input
          required
          name="content"
          type="text"
          label="내용"
          placeholder="내용을 입력하세요"
          maxLength={300}
          rows={5}
          currentValue={formValues.content}
          handleInputChange={(e) =>
            setFormValues((prev) => {
              return { ...prev, content: e.target.value };
            })
          }
        />
        {!pathname.includes("manage") && (
          <FileDragNDropInput setFiles={setFiles} />
        )}
        <ImageInput
          name="image"
          label="사진 첨부"
          caption="사진은 한 게시글 당 최대 2장까지 등록 가능합니다."
          max={2}
          currentImages={currentImages}
          setCurrentImages={setCurrentImages}
        />
        <Checkbox name="pin" content="공지사항 상단 고정하기" />
      </div>
      <Button
        primary
        content="등록하기"
        disabled={!formValues.title || !formValues.content}
      />
    </form>
  );
}
