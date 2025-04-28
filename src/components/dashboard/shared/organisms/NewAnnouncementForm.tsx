"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import useNavigationGuard from "@/hooks/navigationGuard";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import ImageInput from "@/components/common/ImageInput";
import Input from "@/components/common/Input";
import FileDragNDropInput from "@/components/common/FileDragNDropInput";
import { getClubId, getAccessToken } from "@/lib/cookies";

export default function NewAnnouncementForm() {
  useNavigationGuard();
  const pathname = usePathname();

  const [formValues, setFormValues] = useState<{
    title: string;
    content: string;
    isPinned: string;
  }>({ title: "", content: "", isPinned: 'N' });
  const [currentImages, setCurrentImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  console.log("formValues", formValues);
  console.log("title:", formValues.title);
  console.log("content:", formValues.content);
  console.log("isPinned:", formValues.isPinned);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? (checked ? 'Y' : 'N') : value,
    });
    console.log("formValues", formValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const clubId = await getClubId();
    const token = await getAccessToken();
    console.log("clubId", clubId);
    console.log("token", token);

    const formData = new FormData();
    formData.append(
      "data",
      new Blob(
        [JSON.stringify({
          title: formValues.title,
          content: formValues.content,
          isPinned: formValues.isPinned,
        })],
        { type: "application/json" }
      )
    );

    // 이미지와 파일 추가
    // currentImages.forEach(image => {
    //   formData.append("image", image); // 이미지 파일 추가
    // });

    if (currentImages.length > 0) {
      currentImages.forEach(image => {
        if (image) {
          formData.append("image", image);
        }
      });
    } else {
      formData.append("image", new Blob(), "empty.jpg");
    }

   // FormData의 내용을 출력
  formData.forEach((value, key) => {
    console.log("formData 내용", key, value);
  });

    try {
      const response = await fetch(`/api/server/v1/executive/club/${clubId}/notices`, {
        method: "POST",
        body: formData,
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
  
      if (!response.ok) {
        const responseText = await response.text();
        console.log("API 응답 데이터:", responseText);  
        alert('공지사항 등록에 실패했습니다. 다시 시도해 주세요.'); // 수정된 부분
        return;
      }
  
      const data = await response.json();
      alert('공지사항이 성공적으로 등록되었습니다!');
      console.log('공지사항 등록 성공:', data);
      // 이전 페이지로 돌아가기 
      window.history.back();
    } catch (error) {
      console.error('등록 실패:', error);
      // 에러 처리
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
        <Checkbox 
          name="isPinned" 
          content="공지사항 상단 고정하기" 
          checked={formValues.isPinned === 'Y'} // 'Y'일 때 체크
          onChange={handleInputChange} // 체크박스 상태 변경 시 호출
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
