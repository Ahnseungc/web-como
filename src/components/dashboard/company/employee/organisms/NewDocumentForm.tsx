"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import FileDragNDropInput from "@/components/common/FileDragNDropInput";

export default function NewDocumentForm() {
  const [formValues, setFormValues] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="space-y-8 p-8 rounded-xl bg-gray-0" onClick={handleSubmit}>
      <h2 className="font-semibold text-gray-900">{"서류 업로드"}</h2>
      <div className="space-y-6">
        <Input
          required
          name="title"
          label="제목"
          placeholder="제목을 입력하세요"
          maxLength={50}
          currentValue={formValues.title}
          handleInputChange={(e) =>
            setFormValues((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
        />
        <Input
          name="content"
          label="내용"
          placeholder="내용을 입력하세요"
          maxLength={300}
          rows={3}
          currentValue={formValues.content}
          handleInputChange={(e) =>
            setFormValues((prev) => {
              return { ...prev, content: e.target.value };
            })
          }
        />
       <FileDragNDropInput setFiles={setFiles} />
      </div>
      <Button
        primary
        content="동록하기"
        disabled={files.length === 0 || formValues.title === ""}
      />
    </form>
  );
}
