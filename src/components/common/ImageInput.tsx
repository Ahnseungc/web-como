"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Remove } from "@/assets/icons/action";

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  caption?: string;
}

export default function ImageInput(props: Props) {
  const [currentImages, setCurrentImages] = useState<File[]>([]);

  return (
    <div className="flex-1 flex flex-col gap-2">
      <span className="h3 font-semibold text-gray-900">
        {props.label}
        {props.required && <span className="text-point-red">{"*"}</span>}
      </span>
      <div className="flex gap-2">
        {currentImages &&
          currentImages.length > 0 &&
          currentImages.map((image, i) => (
            <div key={i} className="relative object-cover w-[100px] h-[100px]">
              <Image
                src={URL.createObjectURL(image)}
                alt={`사진 ${i}`}
                fill
                sizes="10vw"
                priority
                className="rounded-lg"
              />
              <button
                className="absolute top-1 right-1"
                onClick={() =>
                  setCurrentImages((prev) =>
                    prev.filter((value) => value !== image)
                  )
                }
              >
                <Remove className="w-[18px] h-[18px] text-gray-900" />
              </button>
            </div>
          ))}
        <label
          htmlFor={props.name}
          className="flex items-center justify-center w-[100px] h-[100px] rounded-lg bg-gray-1000 cursor-pointer"
        >
          <Plus className="w-8 h-8 text-gray-50" />
          <input
            type="file"
            accept="image/*"
            name={props.name}
            id={props.name}
            onChange={(e) => {
              const fileList = e.target.files;
              if (fileList && fileList.length > 0) {
                setCurrentImages((prev) => prev.concat(Array.from(fileList)));
              }
            }}
            multiple
            hidden
          />
        </label>
      </div>
      <p className="body-1 font-medium text-gray-500">{props.caption}</p>
    </div>
  );
}
