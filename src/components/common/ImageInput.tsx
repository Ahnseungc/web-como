"use client";

import { useState } from "react";
import Image from "next/image";
import AddIcon from "@/assets/icons/input/add.svg";
import DeleteImageIcon from "@/assets/icons/input/delete_image.svg";

interface Props {
  name: string;
  label?: string;
  required?: boolean;
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
                <Image src={DeleteImageIcon} alt="X" width={18} height={18} />
              </button>
            </div>
          ))}
        <label
          htmlFor={props.name}
          className="flex items-center justify-center w-[100px] h-[100px] rounded-lg bg-gray-1000 cursor-pointer"
        >
          <Image src={AddIcon} alt="+" width={32} height={32} />
          <input
            type="file"
            accept="image/*"
            name={props.name}
            id={props.name}
            required={props.required}
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
    </div>
  );
}
