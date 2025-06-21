"use client";

import { Edit } from "@/assets/icons/util";
import { useToast } from "@/components/common/ToastContainer";
import { getAccessToken, getClubId } from "@/lib/cookies";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  clubImage: string;
};

export default function ClubIndexImageSection<T extends FieldValues>({
  name,
  clubImage,
}: Props<T>) {
  const { register, setValue } = useFormContext<T>();

  // 밑의 previewImage는 미리보기를 위한 상태값
  const [previewImage, setPreviewImage] = useState<string>(clubImage);
  const [clubId, setClubId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { showToast } = useToast();

  console.log("3. ClubIndexImageSection 실행됨");

  useEffect(() => {
    const fetchClubId = async () => {
      try {
        const id = await getClubId(); // clubId 가져오기
        setClubId(id || null); // 상태 업데이트
      } catch (error) {
        console.error("클럽 ID를 가져오는 중 오류 발생:", error);
      }
    };

    fetchClubId(); // 함수 호출
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.files", e.target.files);
    const file = e.target.files?.[0];
    console.log("file", file);
    setFile(file || null);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      console.log("previewImage", previewImage);
      setValue(name, file as PathValue<T, Path<T>>);
      console.log("setValue", setValue);
    }
  };

  const handleSave = async () => {
    console.log("handleSave 실행됨");
    console.log("file", file);
    if (!file) {
      // alert("이미지를 선택해주세요.");
      showToast("이미지를 선택해주세요.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("clubImage", file as Blob); // 키를 "clubImage"로 변경

    try {
      const token = await getAccessToken();
      console.log("clubId", clubId);
      console.log("formData", formData);

      const response = await fetch(`/api/server/v1/executive/club/${clubId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log("result", result);

      if (result.resultCode === "OK") {
        // console.log("이미지가 성공적으로 저장되었습니다.");
        // alert("이미지가 성공적으로 저장되었습니다.");
        showToast("이미지가 성공적으로 저장되었습니다.", "success");
        window.location.reload(); // 페이지 새로 고침
      } else {
        // console.log("이미지 저장에 실패했습니다.");
        // alert("이미지 저장에 실패했습니다.");
        showToast("이미지 저장에 실패했습니다.", "error");
      }
    } catch (error) {
      console.error("이미지 저장 실패:", error);
    }
  };

  return (
    <section className="space-y-6">
      <div className="space-y-6 rounded-xl bg-gray-0 p-5">
        <div className="flex items-center justify-between">
          <h3 className="h2 font-bold text-gray-900">{"대표 이미지"}</h3>
          <label htmlFor={name}>
            <Edit className="h-6 w-6 cursor-pointer text-gray-900" />
          </label>
        </div>
        <div className="relative aspect-square w-[21.9rem] rounded-lg bg-gray-300">
          <input
            type="file"
            accept="image/*"
            id={name}
            hidden
            {...register(name)}
            onChange={handleFileChange}
          />
          {(previewImage || clubImage) &&
            (previewImage ? (
              <img
                src={previewImage}
                alt="미리보기 이미지"
                className="rounded-lg w-full h-full object-cover"
              />
            ) : (
              <Image
                src={clubImage}
                alt="대표 이미지"
                fill
                priority
                sizes="(max-width: 800px) 50vw, (max-width: 1000px) 40vw, (max-width: 1500px) 33vw, 20vw"
                className="rounded-lg"
                style={{ objectFit: "cover" }}
              />
            ))}
          {/* {clubImage && (
            <Image
              src={clubImage}
              alt="대표 이미지"
              fill
              priority
              sizes="(max-width: 800px) 50vw, (max-width: 1000px) 40vw, (max-width: 1500px) 33vw, 20vw"
              className="rounded-lg"
              style={{ objectFit: "cover" }}
            />
          )} */}
        </div>
      </div>
      <button
        type="button" // 기본 동작 방지
        className="h3 w-full rounded-md bg-gray-900 py-4 text-center font-bold text-gray-50"
        onClick={handleSave}
      >
        {"저장하기"}
      </button>
    </section>
  );
}
