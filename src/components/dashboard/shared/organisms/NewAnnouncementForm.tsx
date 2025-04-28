"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useNavigationGuard from "@/hooks/navigationGuard";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import ImageInput from "@/components/common/ImageInput";
import Input from "@/components/common/Input";
import FileDragNDropInput from "@/components/common/FileDragNDropInput";

interface FormValues {
  title: string;
  content: string;
  isPinned: "Y" | "N";
}

export default function NewAnnouncementForm() {
  useNavigationGuard();
  const pathname = usePathname();
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    content: "",
    isPinned: "N",
  });
  const [currentImages, setCurrentImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(formValues));

      // 이미지 파일들을 직접 FormData에 추가
      currentImages.forEach((file, index) => {
        formData.append("image", file);
      });

      const response = await fetch("/api/notices", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.resultCode === "OK") {
        alert("공지사항 게시 및 업로드 알림이 완료되었습니다.");
        router.push("/club/dashboard/notices");
      } else {
        alert("공지사항 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("공지사항 등록 오류:", error);
      alert("공지사항 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <form
      className="space-y-8 p-8 rounded-xl bg-gray-0"
      onSubmit={handleSubmit}
    >
      <h2 className="font-semibold text-gray-900">{"공지사항 글쓰기"}</h2>
      <div className="space-y-6">
        {/* <Input
          readOnly
          name="author"
          type="text"
          label="작성자"
          value="운영장"
        /> */}
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
              return {
                ...prev,
                content: e.target.value,
              };
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
        <Checkbox
          name="pin"
          content="공지사항 상단 고정하기"
          checked={formValues.isPinned === "Y"}
          onChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              isPinned: e.target.checked ? "Y" : "N",
            }));
          }}
        />
      </div>
      <Button
        primary
        content="등록하기"
        disabled={!formValues.title || !formValues.content}
      />
    </form>
  );
}
