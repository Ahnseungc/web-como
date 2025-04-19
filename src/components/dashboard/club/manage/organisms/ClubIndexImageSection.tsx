"use client";

import { Edit } from "@/assets/icons/util";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
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

  console.log("3. ClubIndexImageSection 실행됨");
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue(name, file as PathValue<T, Path<T>>);
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
          {clubImage && (
            <Image
              src={clubImage}
              alt="대표 이미지"
              fill
              priority
              sizes="(max-width: 800px) 50vw, (max-width: 1000px) 40vw, (max-width: 1500px) 33vw, 20vw"
              className="rounded-lg"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </div>
      <button className="h3 w-full rounded-md bg-gray-900 py-4 text-center font-bold text-gray-50">
        {"저장하기"}
      </button>
    </section>
  );
}
